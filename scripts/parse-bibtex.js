#!/usr/bin/env node
/**
 * BibTeX to TypeScript Publications Converter
 * 
 * Usage: node scripts/convert-bib.js
 * 
 * Reads data/publications.bib and outputs TypeScript publication objects
 */

const fs = require('fs');
const path = require('path');

// Read the BibTeX file
const bibPath = path.join(__dirname, '..', 'data', 'publications.bib');
const bibContent = fs.readFileSync(bibPath, 'utf-8');

console.log('Parsing publications.bib...\n');

// Parse BibTeX entries - more robust version
const publications = [];
const entryPattern = /@(\w+)\s*\{\s*([^,\s]+)\s*,([\s\S]*?)(?=\n@|\n*$)/g;

let match;
let entryCount = 0;

while ((match = entryPattern.exec(bibContent)) !== null) {
  entryCount++;
  const [fullMatch, entryType, citationKey, fieldsContent] = match;
  
  // Skip comments
  if (citationKey.startsWith('%')) continue;
  
  const entry = {
    id: citationKey.trim(),
    bibtex: fullMatch
  };
  
  // Parse fields
  const fields = parseFields(fieldsContent);
  entry.type = getPublicationType(entryType.toLowerCase(), fields.type);
  if (entryType.toLowerCase() === 'presentation') {
    entry.invited = true;
  }
  
  // Extract required fields
  entry.title = fields.title || 'Unknown Title';
  entry.authors = parseAuthors(fields.author || 'Unknown Author');
  entry.year = parseInt(fields.year) || new Date().getFullYear();
  entry.venue = fields.venue || fields.journal || fields.booktitle || fields.publisher || fields.series || 'Unknown Venue';
  
  // Optional fields
  if (fields.doi) {
    entry.doi = fields.doi;
    entry.url = `https://doi.org/${fields.doi}`;
  }
  if (fields.url && !entry.url) {
    entry.url = fields.url;
  }
  if (fields.eprint && fields.eprinttype === 'arXiv') {
    entry.arxiv = fields.eprint;
  }
  if (fields.keywords) {
    // Split keywords by semicolon or comma and clean them
    entry.keywords = fields.keywords
      .split(/[;,]/)
      .map(k => k.trim())
      .filter(k => k.length > 0);
  }
  if (fields.invited === 'true') {
    entry.invited = true;
  }
  if (fields.award) {
    entry.award = fields.award;
  }
  
  publications.push(entry);
}

console.log(`✅ Found ${publications.length} publications\n`);

if (publications.length === 0) {
  console.log('⚠️  No publications found. Check your BibTeX format.\n');
  process.exit(1);
}

// Helper functions for escaping
function escapeString(str) {
  if (!str) return '';
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

function escapeBibtex(str) {
  if (!str) return '';
  return str.replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

// Generate TypeScript output
let output = `import type { Publication } from './publications';\n\n`;
output += `export const publications: Publication[] = [\n`;

publications.forEach((pub, index) => {
  output += '  {\n';
  output += `    id: "${escapeString(pub.id)}",\n`;
  output += `    title: "${escapeString(pub.title)}",\n`;
  output += `    authors: [${pub.authors.map(a => `"${escapeString(a)}"`).join(', ')}],\n`;
  output += `    venue: "${escapeString(pub.venue)}",\n`;
  output += `    year: ${pub.year},\n`;
  output += `    type: "${pub.type}",\n`;
  
  if (pub.doi) {
    output += `    doi: "${escapeString(pub.doi)}",\n`;
  }
  if (pub.url) {
    output += `    url: "${escapeString(pub.url)}",\n`;
  }
  if (pub.arxiv) {
    output += `    arxiv: "${escapeString(pub.arxiv)}",\n`;
  }
  if (pub.keywords && pub.keywords.length > 0) {
    output += `    keywords: [${pub.keywords.map(k => `"${escapeString(k)}"`).join(', ')}],\n`;
  }
  if (pub.invited) {
    output += `    invited: true,\n`;
  }
  if (pub.award) {
    output += `    award: "${escapeString(pub.award)}",\n`;
  }
  
  output += `    bibtex: \`${escapeBibtex(pub.bibtex)}\`\n`;
  output += `  }${index < publications.length - 1 ? ',' : ''}\n`;
});

output += '];\n';

// Write to file
const outputPath = path.join(__dirname, '..', 'data', 'publications-generated.ts');
fs.writeFileSync(outputPath, output, 'utf8');
console.log(`✅ Successfully generated ${publications.length} publications to ${outputPath}`);

// Helper functions
function parseFields(content) {
  const fields = {};
  const lines = content.split('\n');
  let currentField = '';
  let currentValue = '';
  let braceDepth = 0;
  
  for (let line of lines) {
    line = line.trim();
    if (!line || line === '}') continue;
    
    // Check for new field: fieldname = {value or fieldname = "value" or fieldname = value
    const fieldMatch = line.match(/^(\w+)\s*=\s*(.*)$/);
    
    if (fieldMatch && braceDepth === 0) {
      // Save previous field
      if (currentField) {
        fields[currentField] = cleanValue(currentValue);
      }
      
      currentField = fieldMatch[1].toLowerCase();
      let value = fieldMatch[2].trim();
      
      // Determine delimiter type
      const delimiter = value[0];
      
      // Handle unquoted numeric or simple values (e.g., year = 2021)
      if (delimiter !== '{' && delimiter !== '"') {
        // Extract value up to comma or end of line
        const match = value.match(/^([^,]+),?\s*$/);
        if (match) {
          fields[currentField] = cleanValue(match[1]);
          currentField = '';
          currentValue = '';
          braceDepth = 0;
        }
        continue;
      }
      
      // Remove the opening delimiter
      value = value.substring(1);
      
      if (delimiter === '{') {
        // Count opening and closing braces to handle nested braces
        const openBraces = (value.match(/\{/g) || []).length;
        const closeBraces = (value.match(/\}/g) || []).length;
        braceDepth = 1 + openBraces - closeBraces;
        
        // Remove trailing }, or } if present
        if (value.endsWith('},')) {
          value = value.slice(0, -2);
          braceDepth--;
        } else if (value.endsWith('}')) {
          value = value.slice(0, -1);
          braceDepth--;
        }
        
        currentValue = value;
        
        if (braceDepth <= 0) {
          fields[currentField] = cleanValue(currentValue);
          currentField = '';
          currentValue = '';
          braceDepth = 0;
        }
      } else {
        // Quote-delimited value
        const endQuote = value.indexOf('"');
        if (endQuote !== -1) {
          fields[currentField] = cleanValue(value.substring(0, endQuote));
          currentField = '';
        } else {
          currentValue = value;
        }
      }
    } else if (currentField && braceDepth > 0) {
      // Continue multi-line value
      currentValue += ' ' + line;
      
      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;
      braceDepth += openBraces - closeBraces;
      
      if (braceDepth <= 0) {
        // Remove trailing commas and braces
        currentValue = currentValue.replace(/\}[,\s]*$/, '');
        fields[currentField] = cleanValue(currentValue);
        currentField = '';
        currentValue = '';
        braceDepth = 0;
      }
    }
  }
  
  return fields;
}

function parseAuthors(authorString) {
  return authorString.split(' and ').map(author => {
    author = author.trim();
    
    // Already in "Last, F." format
    if (author.includes(',')) {
      const parts = author.split(',').map(p => p.trim());
      const lastName = parts[0];
      const firstName = parts[1];
      
      // Return "Last, F." format
      if (firstName.length === 1 || firstName.endsWith('.')) {
        return `${lastName}, ${firstName}`;
      }
      return `${lastName}, ${firstName.charAt(0)}.`;
    }
    
    // "First Last" format - convert to "Last, F."
    const parts = author.split(' ').filter(p => p);
    if (parts.length >= 2) {
      const lastName = parts[parts.length - 1];
      const firstName = parts[0];
      return `${lastName}, ${firstName.charAt(0)}.`;
    }
    
    return author;
  });
}

function getPublicationType(bibtexType, declaredType) {
  const validDeclaredTypes = new Set([
    'Conference',
    'Journal',
    'Workshop',
    'Preprint',
    'Book Chapter',
    'Invited Talk',
    'Presentation'
  ]);

  if (validDeclaredTypes.has(declaredType)) {
    return declaredType;
  }

  const typeMap = {
    'article': 'Journal',
    'inproceedings': 'Conference',
    'incollection': 'Book Chapter',
    'inbook': 'Book Chapter',
    'presentation': 'Presentation',
    'misc': 'Preprint',
    'techreport': 'Preprint',
    'phdthesis': 'Book Chapter',
    'mastersthesis': 'Book Chapter'
  };
  
  return typeMap[bibtexType] || 'Conference';
}

function cleanValue(value) {
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\{\{(.*?)\}\}/g, '$1') // Remove double braces
    .replace(/^\{(.*)\}$/, '$1') // Remove outer single braces
    .replace(/\\&/g, '&')
    .replace(/\\%/g, '%')
    .replace(/\\_/g, '_')
    // Handle LaTeX special characters and umlauts
    .replace(/\\"o/g, 'ö')
    .replace(/\\"a/g, 'ä')
    .replace(/\\"u/g, 'ü')
    .replace(/\\"O/g, 'Ö')
    .replace(/\\"A/g, 'Ä')
    .replace(/\\"U/g, 'Ü')
    .replace(/\\ss/g, 'ß')
    .replace(/\{\\ss\}/g, 'ß');
}
