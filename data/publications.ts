export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: 'Conference' | 'Journal' | 'Workshop' | 'Preprint' | 'Book Chapter' | 'Invited Talk' | 'Presentation';
  doi?: string;
  url?: string;
  arxiv?: string;
  pdfUrl?: string;
  codeUrl?: string;
  bibtex: string;
  award?: string; // Award name/description
  invited?: boolean; // Is this an invited talk/paper?
  keywords?: string[]; // Keywords/hashtags for filtering
}

// Your name to highlight in publications
export const YOUR_NAME = "Filipov, V."; // Adjust this to match your name in citations

// Import publications from the generated file
// To regenerate: run `node scripts/parse-bibtex.js`
import { publications as generatedPublications } from './publications-generated';

export const publications: Publication[] = generatedPublications;

// Utility function to format authors with your name highlighted
export function formatAuthors(authors: string[], yourName: string = YOUR_NAME): Array<{ name: string; isYou: boolean }> {
  return authors.map(author => ({
    name: author,
    isYou: author === yourName || author.includes(yourName.split(',')[0])
  }));
}

// Utility function to parse BibTeX from a .bib file content
export function parseBibtex(bibtexContent: string): Publication[] {
  const entries: Publication[] = [];
  
  // Simple regex-based parser for BibTeX entries
  // Note: This is a basic parser. For production, consider using a library like bibtex-parse-js
  const entryRegex = /@(\w+)\{([^,]+),\s*([\s\S]*?)\n\}/g;
  const fieldRegex = /(\w+)\s*=\s*\{([^}]*)\}/g;
  
  let match;
  while ((match = entryRegex.exec(bibtexContent)) !== null) {
    const entryType = match[1];
    const citationKey = match[2];
    const fields = match[3];
    
    const entry: Partial<Publication> = {
      id: citationKey,
      bibtex: match[0]
    };
    
    let fieldMatch;
    while ((fieldMatch = fieldRegex.exec(fields)) !== null) {
      const key = fieldMatch[1].toLowerCase();
      const value = fieldMatch[2];
      
      switch (key) {
        case 'title':
          entry.title = value;
          break;
        case 'author':
          entry.authors = value.split(' and ').map(a => a.trim());
          break;
        case 'year':
          entry.year = parseInt(value);
          break;
        case 'journal':
        case 'booktitle':
          entry.venue = value;
          break;
        case 'doi':
          entry.doi = value;
          entry.url = `https://doi.org/${value}`;
          break;
      }
    }
    
    // Determine publication type from BibTeX entry type
    const typeMap: Record<string, Publication['type']> = {
      'article': 'Journal',
      'inproceedings': 'Conference',
      'incollection': 'Book Chapter',
      'misc': 'Preprint',
      'presentation': 'Presentation'
    };
    
    const declaredType = fields.match(/\btype\s*=\s*\{([^}]*)\}/i)?.[1];
    const validDeclaredTypes = new Set<Publication['type']>([
      'Conference',
      'Journal',
      'Workshop',
      'Preprint',
      'Book Chapter',
      'Invited Talk',
      'Presentation'
    ]);
    entry.type = declaredType && validDeclaredTypes.has(declaredType as Publication['type'])
      ? declaredType as Publication['type']
      : typeMap[entryType.toLowerCase()] || 'Conference';
    if (entryType.toLowerCase() === 'presentation') {
      entry.invited = true;
    }
    
    if (entry.title && entry.authors && entry.venue && entry.year) {
      entries.push(entry as Publication);
    }
  }
  
  return entries;
}

// Sort publications by year (most recent first)
export function sortPublicationsByYear(pubs: Publication[]): Publication[] {
  return [...pubs].sort((a, b) => b.year - a.year);
}

// Group publications by year
export function groupPublicationsByYear(pubs: Publication[]): Record<number, Publication[]> {
  return pubs.reduce((acc, pub) => {
    if (!acc[pub.year]) {
      acc[pub.year] = [];
    }
    acc[pub.year].push(pub);
    return acc;
  }, {} as Record<number, Publication[]>);
}

// Get all unique keywords/hashtags from publications with counts
export function getKeywordsWithCounts(pubs: Publication[]): Array<{ keyword: string; count: number }> {
  const keywordCounts = new Map<string, number>();
  
  pubs.forEach(pub => {
    if (pub.keywords) {
      pub.keywords.forEach(keyword => {
        const normalizedKeyword = keyword.toLowerCase().trim();
        keywordCounts.set(normalizedKeyword, (keywordCounts.get(normalizedKeyword) || 0) + 1);
      });
    }
  });
  
  return Array.from(keywordCounts.entries())
    .map(([keyword, count]) => ({ keyword, count }))
    .sort((a, b) => b.count - a.count); // Sort by count descending
}

// Filter publications by keyword
export function filterPublicationsByKeyword(pubs: Publication[], keyword: string): Publication[] {
  if (!keyword) return pubs;
  
  const normalizedKeyword = keyword.toLowerCase().trim();
  
  return pubs.filter(pub => 
    pub.keywords?.some(k => k.toLowerCase().trim() === normalizedKeyword)
  );
}
