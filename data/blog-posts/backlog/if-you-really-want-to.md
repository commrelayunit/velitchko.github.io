---
title: "If You Really, Really, Really Want to Do This"
subtitle: "A practical privacy pack for auditing your digital footprint and reducing dependencies"
date: "2026-09-09"
author: "Velitchko Filipov"
hashtags:
  - privacy
  - digital-sovereignty
  - digital-footprint
categories:
  - Privacy
  - Technology
  - Guide
excerpt: "So you really want to reclaim your digital life? This is where I would start: map your footprint before deleting anything, secure the identities that matter, audit the ecosystems you depend on, replace defaults deliberately, and only then start deleting and self-hosting."
featured: false
---

# If You Really, Really, Really Want to Do This

> *Before you start deleting accounts and rebuilding your software stack, you need to know what you actually have.*


![Privacy Pack](/blog/privacypack.png)


In the [previous post](https://velitchko.github.io/blog/rabbit-hole-2026), I wrote about the curiosity that pushed me down this rabbit hole: from my operating system to the applications running in the background, and the uncomfortable realization that much of the technology I used every day ran on defaults I had never consciously chosen.<sup>[1](#note-1)</sup>

If somebody reads the first two pieces and thinks, *"Okay, fine. I really, really, really want to do this. Where do I actually start?"*, this is roughly the answer I would give them.

The temptation is to begin with the fun part. Install Linux. Flash GrapheneOS. Replace Google Search. Set up a home server. Delete Facebook. Spend a weekend moving everything into open-source software and self-hosted solutions and emerge on Monday as a sovereign digital citizen. 😅

I would not start there. Before changing the things you know about, you need to find the parts you do not know about.

So, I would begin with an audit. Don't think about removing, migrating, or deleting anything yet. Start by building a map of the digital footprint you already have. There will be many services you forgot existed at all.

So start off by asking:

> **What accounts exist, which identities connect them, what data they contain, which ones still matter, and which can I realistically remove?**

---

## Step Zero: Decide What You Are Actually Trying to Achieve

One lesson from going through this process is that "more privacy" is not a particularly useful specification. Privacy, security, anonymity, convenience, resilience, and independence overlap, but they are not the **same** goal. A setup designed for a journalist protecting sources will look very different from one designed for somebody who simply wants fewer companies profiling them.

My own goal is comparatively boring: reduce unnecessary data collection, reduce vendor lock-in, remove accounts I no longer need, make the devices I own more understandable, and keep important data in places where I have a reasonable degree of control over it.

Identifying your goal and scope at this point matters because otherwise this becomes an endless optimization problem. There will always be another setting to harden, another service to replace, another server to self-host, and another person online willing to tell you that the thing you just installed is still insufficiently private or secure.

<mark>The goal is not privacy purity. The goal is deliberate control.</mark>

Once I framed the project that way, the next step was obvious: I needed to know what I was actually dealing with.

---

## Build the Map Before You Burn the Map

Most of us do not have an accurate and up-to-date list of our online accounts. We have a vague memory of some important ones and a password manager containing some of the rest. Somewhere beyond that is a much larger graveyard of old shops, forums, SaaS trials, newsletters, apps, social networks, travel sites, developer tools, and services we authenticated into once with OAuth and immediately forgot.

That is where I would start.

Before deleting anything, collect the identifiers you have used over the years: current and old email addresses, usernames, aliases, phone numbers, and any recurring handles. Then use multiple sources to reconstruct the account history. No single technique finds everything and most propose nonexistent candidates, but if they overlap, this becomes surprisingly informative.

This [repository](https://github.com/commrelayunit/digital-footprint-audit) is what I use to analyse my email inbox, alongside scripts that check exposure using OSINT tools. The idea is to combine imperfect signals into one local audit that helps narrow down which services you are signed up for and how exposed your digital footprint actually is.

### The signals I currently use

| Source | What it can reveal | Important caveat |
| --- | --- | --- |
| Sherlock | Public profiles associated with usernames across hundreds of sites | A matching username is not proof that the account is yours |
| MailAccess / email-account discovery | Services potentially associated with an email address | Availability and reliability vary by service; treat results as leads |
| Have I Been Pwned | Breaches in which an email address appears | A breach record is evidence the address existed in that dataset, not necessarily that the account still exists |
| Google Takeout / Gmail MBOX | Registration emails, verification messages, receipts, password resets, newsletters, OAuth notices | Your mailbox is extremely sensitive and should be analyzed locally |
| Firefox password export | Domains for which you have saved credentials | The CSV contains passwords in plaintext—handle it like a secret |
| Google third-party connections | Services where you used Sign in with Google or granted account access | Removing the Google connection does **not** delete the third-party account |

Sherlock is useful because usernames are surprisingly persistent. The project can check a username across hundreds of social networks and other services, which makes it useful as a discovery mechanism rather than as definitive proof of ownership.<sup>[2](#note-2)</sup> Have I Been Pwned gives you another historical signal: if an old email address appears in a breach associated with a service you had completely forgotten, that is a good reason to investigate whether the account still exists and whether its password was reused anywhere else.<sup>[3](#note-3)</sup>

The more interesting sources, however, are often the ones you already have.

---

## Your Inbox Is an Accidental Account Database

Email is one of the best records of your digital history because almost every service has, at some point, sent some variation of:

- "Welcome!"
- "Verify your email address."
- "Your account has been created."
- "Reset your password."
- "Your receipt."
- "We have updated our Terms of Service."
- "We miss you."
- "Sad to see you go." 🙄

Google Takeout lets you export data from your Google account, including Gmail, and that archive can be examined locally.<sup>[4](#note-4)</sup> For Gmail, this means you can turn years of messages into a searchable source for account discovery. My repository is experimenting with analyzing the exported mailbox for domains, common registration language, receipts, verification links, password-reset emails, OAuth notifications, and other patterns that suggest an account relationship.

It is essential that this analysis happens **locally** to limit exposure. A Google Takeout archive is effectively a compressed history of your digital life. Uploading it to a random "privacy scanner" is a horrible idea.

The same applies even more strongly to browser password exports. Firefox allows saved logins to be exported to CSV, which can be incredibly useful for discovering accounts you have forgotten.<sup>[5](#note-5)</sup> Mozilla also makes the danger very explicit: the exported passwords are readable plaintext.

> **Do not upload a browser password CSV to an online tool. Do not email it to yourself. Do not leave it sitting in Downloads for six months.**

You should use the analyzer to extract the service and domain information locally, produce the report, and then destroy the CSV immediately. The passwords themselves are not interesting for the audit; the fact that an account existed is.

---

## Google Will Also Tell You Which Apps You Forgot About

One of the simplest checks requires no OSINT tooling at all.

Open your Google Account and review the third-party connections. Google lets you see applications where you use **Sign in with Google**, applications that have been granted access to Google Account data, and accounts that have been linked to Google in other ways.<sup>[6](#note-6)</sup>

Something to note: **unlinking an application from Google is not the same as deleting the account**. If you used Google OAuth to create an account with a service, removing its Google access may only sever the authentication relationship. The service can still have a perfectly valid account containing your name, email address, activity history, uploads, purchases, or whatever else you gave it.

Therefore, treat any results here as another discovery source. Before revoking access, first determine whether you still need the service and whether that is your only login method. If I want to keep the account, I make sure there is another way to authenticate. If I do not want it, I delete the account at the service itself and then remove the Google connection.

This order saves a surprising amount of pain.

---

## How to Make the Actual Audit

Finding accounts is only useful if you can turn the findings into decisions. A giant list of 600 domains is not really a strategy; it is just a new source of anxiety (oh yes, I have been there).

So to make it more useful the audit needs a bit of structure. For each service I wanted at least:

| Field | Question |
| --- | --- |
| Service | What company or product is this? |
| Identifier | Which email, username, phone number, or OAuth identity was used? |
| Access | Can I still log in? |
| Usage | Do I still actively use it? |
| Sensitivity | What kind of data did I give it? |
| Security | Is the password unique? Is MFA enabled? Has the service appeared in a breach? |
| Dependency | Is another account required to authenticate? |
| Vendor ecosystem | Does it belong to a larger platform relationship? |
| Decision | Keep, migrate, delete, investigate, or legally required retention |
| Status | Not started, request sent, waiting, deleted, retained |
| Notes | DPO contacts, deletion URLs, retention explanations, support history |

Once that exists, you can sort by risk, importance, and effort to systematically prune your digital exposure. Randomly deleting whatever account happens to annoy you that afternoon is also a strategy that tends to work. If you do it consistently, at some point you will get through the list.

My own priority order is roughly: secure the important accounts; delete obvious junk; investigate accounts I cannot access; and only then start migrating services that I actively use.

That might sound backwards for a post about reducing your footprint, but there is little point deleting twenty abandoned forum accounts without having your primary email secured with proper MFA.

---

## Then Comes the "de-MAGA" Part

I have started referring to one part of this as **de-MAGA**: reducing dependence on Meta/Microsoft, Amazon, Google, and Apple. Yes, the acronym cheats slightly. Please direct complaints to the acronym department 😅.

You cannot really purge every trace of these companies from existence. Amazon alone sits underneath an enormous amount of web infrastructure through AWS; trying to avoid every indirect dependency is to a given extent impossible.

However, looking at your **direct relationships** with these services is much more useful. Check what your exposure is: accounts, identity, storage, communication, operating systems, purchases, behavioural history, and where these companies are the primary party holding your information.

For me, Google is a good example. My Google account had accumulated years of email, authentication relationships, app activity, search behaviour, YouTube history, location-related data, and device information. I did not need to delete Google overnight; it is still ongoing. But the first move was transferring my emails, authentication, photos, and Drive contents away from Google. Then I replaced the browser and search-engine defaults. I turned off unnecessary history and tracking, and over time this gradually turned Google from *the one service* into *one of the services*.

---

## My "Privacy Pack": Change Defaults Selectively

Once the footprint is mapped and the important accounts are secured, I would start changing the stack. People call these **privacy packs**<sup>[7](#note-7)</sup>: not a definitive setup, but a few defaults that reduce unnecessary exposure without turning everyday computing into a full-time security hobby.

If Linux fits your workflow, try it. I use Arch because I value inspectability and control, but that is not a recommendation to start there. Fedora, Ubuntu, Mint, and other mainstream distributions may be the better transition. If you stay on Windows or macOS, the project is not pointless: review telemetry and cloud integrations, remove unused software, use full-disk encryption, keep the system updated, and understand what starts with it. The best operating system is the one you can maintain and recover.

On supported hardware, GrapheneOS is my preferred Android setup because Google Play can run as ordinary sandboxed applications rather than privileged OS components.<sup>[8](#note-8)</sup> But no one needs to buy a Pixel and flash it tomorrow. Permissions, unnecessary background access, history settings, and unwanted apps are useful places to start on any phone.

Open source helps where it creates a real exit path, not because it is a religion. A neglected open-source project can be worse than a well-maintained proprietary service. What matters is whether you can inspect the trade-off, export your data, maintain the thing, and leave later. I use Privacy Guides, F-Droid, and Awesome Privacy as starting points, not endorsements.<sup>[9](#note-9)</sup><sup>[10](#note-10)</sup><sup>[11](#note-11)</sup>

A rough map of the kinds of tools I look at is:

| Need | Starting points I would investigate |
| --- | --- |
| Browser | Firefox |
| Search | DuckDuckGo, SearXNG |
| Android app discovery | F-Droid, Obtanium |
| Basic Android utilities | Fossify, Libre-* |
| Messaging | Signal |
| Password management | Bitwarden, KeePassXC |
| 2FA | Proton Auth, Ente Auth |
| Email | Proton Mail, Tuta Mail |
| Maps/navigation | Organic Maps, OsmAnd |
| Notes | Standard Notes |
| File synchronization | Nextcloud, Syncthing |
| Photos | Immich |
| Media | Jellyfin |
| Network-wide filtering | Pi-hole, WireGuard, OPNsense |
| Private metasearch | SearXNG |

This is my list of **starting points**. Things may change, projects get acquired, maintenance stops, and the "best" application today may be a poor recommendation two years from now. But this does not change the habit I want to develop: **becoming less dependent on cloud services and vendor lock-in**.

---

## Self-Hosting Comes Later

Self-hosting is one of the most satisfying parts of this journey because it makes ownership tangible. 

<mark>Your files are on your hardware</mark>.

<mark>Your service runs because you run it</mark>.

<mark>You decide when it updates and, at least in principle, who gets access.</mark>

When you self-host something, you are not removing responsibility; you are moving responsibility from a company onto yourself. Security updates, backups, authentication, storage failures, TLS certificates, remote access, monitoring, and disaster recovery are now your problem.

That is why I would **not** begin this journey by self-hosting email, moving every password into a server you configured yesterday, or exposing twenty Docker containers directly to the internet.

Start small: set up a media server, local DNS blocker, test SearXNG instance, or another replaceable service. Add proper backups. Learn how updates work. Learn what you are exposing to the network. Then you can move on to more.

A small guiding principle:

> **If losing the service on a Sunday night would ruin your week, it probably should not be your first self-hosted container.**

---

## From the Audit to Actually Deleting Things

Once the audit produces a list of accounts, the next step is simply to start. You decide: keep, secure, migrate, reduce permissions, or delete. Sometimes it is easy: there is a visible **Delete account** button somewhere in the account settings. [JustDeleteMe](https://justdeleteme.xyz/)<sup>[12](#note-12)</sup> is useful for finding the links companies bury. [YourDigitalRights.org](https://yourdigitalrights.org/)<sup>[13](#note-13)</sup> is another good starting point when that button does not exist or does not work.

For EU-based requests (yes, we have the GDPR), this is the practical flow I would use. It is not legal advice.

1. **Export your data if you want to keep it and confirm how you will still log in.** Do this before deleting an account or revoking an OAuth connection.
2. **Use the normal deletion route if it exists.** Save a confirmation or screenshot in the audit record.
3. **If that fails, find the controller's privacy contact.** Check the privacy policy for a privacy team, DPO, EU representative, or data-subject-rights address.
4. **Send a narrow, documented request.** Identify the account or identifier, state what you want erased, and ask for confirmation. Article 17 is the usual erasure route, subject to its conditions and exceptions.<sup>[14](#note-14)</sup>
5. **Update your table with a status.** Record the date, addresses contacted, ticket number, response, and any retention explanation.
6. **Track the deadline and escalate deliberately.** Article 12 generally requires a response within one month; a controller can extend this by up to two further months for complex requests, but **should tell you within the first month and explain why**.<sup>[15](#note-15)</sup> If support loops, ask for the privacy team or DPO. If the response remains inadequate, the relevant supervisory authority is the next step.

The GDPR itself was rarely the difficult part for me. The organisational machinery around it was. Some companies deleted everything within hours. Others took weeks to acknowledge a request, sent me back to broken forms, or required access to an account whose login system no longer worked.

This is not proof that every retained record is non-compliance. Some data has to be kept for legal, tax, fraud, or contractual reasons. In those cases, I want a clear explanation of **what** remains, **why**, and **for how long**.

I also use LLMs here, but only for the administrative drudgery: drafting a concise follow-up, translating a request, or summarising a long support thread. I still decide what to ask for and read every message before it goes out.

---

## Things I Would *Not* Do

I would not delete accounts before exporting the data I want to keep. I would not revoke an OAuth provider before establishing an alternative login method. I would not upload mailbox archives, credentials, or personal information to online "audit" services. I would not switch every tool at once and then spend two weeks unable to work because my calendar, contacts, maps, notes, and passwords all changed together.

I also would not try to eliminate every indirect Big Tech dependency. Discovering that a privacy-respecting service happens to use AWS does not automatically make migrating away from it worthwhile. There is an enormous difference between Amazon operating the infrastructure underneath a service and Amazon directly owning your identity, purchase history, voice recordings, photos, and behavioral profile.

Focus on the relationships where your decisions actually change something.

## The Goal Is Optionality

After going through this for a while and reflecting on my process and experience, I think optionality is a better measure of digital sovereignty than purity.

Can I leave this service without losing years of data?

Can I export in a useful format?

Can I authenticate without one company being the gatekeeper for everything else?

Can I replace the application without rebuilding my entire workflow?

Can I understand what my operating system is doing?

Can I delete an account without thirty-seven emails?

Can I choose convenience today without making that choice irreversible tomorrow?

This wraps up the practical part from the first two posts: **build the map, secure the foundations, reduce the dependencies that no longer make sense, and keep an exit path open for the ones you choose to keep.**

I know this is not a perfect stack, but it is the one I use. The intent of the process I followed was to make the defaults a little less default. If you have suggestions, let me know!

---

## Notes & References

Below is a list of references so you can scan everything in one place.

<ol>
  <li id="note-1">
    <strong>The Rabbit Hole Starts With One Question</strong><br />
    Velitchko Filipov<br />
    <a href="https://velitchko.github.io/blog/rabbit-hole-2026" target="_blank" rel="noopener noreferrer">https://velitchko.github.io/blog/rabbit-hole-2026</a><br />
    The second post in this series, covering the questions around Windows, Linux, GrapheneOS, defaults, inspectability, and digital sovereignty that led into this practical workflow.
  </li>

  <li id="note-2">
    <strong>Sherlock Project</strong><br />
    Sherlock Project contributors<br />
    <a href="https://github.com/sherlock-project/sherlock" target="_blank" rel="noopener noreferrer">https://github.com/sherlock-project/sherlock</a><br />
    An open-source username-search tool that checks for matching public profiles across many online services. Useful for discovery, but matches should always be verified manually.
  </li>

  <li id="note-3">
    <strong>Have I Been Pwned</strong><br />
    Troy Hunt<br />
    <a href="https://haveibeenpwned.com/" target="_blank" rel="noopener noreferrer">https://haveibeenpwned.com/</a><br />
    A breach-notification and lookup service that can reveal whether an email address appears in known data breaches.
  </li>

  <li id="note-4">
    <strong>Google Takeout</strong><br />
    Google<br />
    <a href="https://takeout.google.com/" target="_blank" rel="noopener noreferrer">https://takeout.google.com/</a><br />
    Google's export mechanism for downloading data from a Google Account. Gmail exports can be used locally as a historical source for discovering account registrations and service relationships.
  </li>

  <li id="note-5">
    <strong>Export login data from Firefox</strong><br />
    Mozilla Support<br />
    <a href="https://support.mozilla.org/" target="_blank" rel="noopener noreferrer">https://support.mozilla.org/</a><br />
    Firefox can export saved logins to CSV. The export contains readable passwords and should therefore be treated as highly sensitive and deleted securely after use.
  </li>

  <li id="note-6">
    <strong>Google Account – Third-party connections</strong><br />
    Google<br />
    <a href="https://myaccount.google.com/connections" target="_blank" rel="noopener noreferrer">https://myaccount.google.com/connections</a><br />
    Shows applications and services connected to a Google Account, including Sign in with Google relationships and third-party access.
  </li>

  <li id="note-7">
    <strong>Privacy Pack</strong><br />
    Privacy Pack project<br />
    <a href="https://privacypack.org/" target="_blank" rel="noopener noreferrer">https://privacypack.org/</a><br />
    A practical “build your own” resource for assembling a privacy-oriented software stack and deliberately choosing defaults that reduce unnecessary exposure.
  </li>

  <li id="note-8">
    <strong>GrapheneOS</strong><br />
    GrapheneOS Project<br />
    <a href="https://grapheneos.org/" target="_blank" rel="noopener noreferrer">https://grapheneos.org/</a><br />
    A security- and privacy-focused Android-based operating system with a strong sandboxing model and support for installing Google Play as ordinary sandboxed applications.
  </li>

  <li id="note-9">
    <strong>Privacy Guides</strong><br />
    Privacy Guides<br />
    <a href="https://www.privacyguides.org/" target="_blank" rel="noopener noreferrer">https://www.privacyguides.org/</a><br />
    A curated collection of privacy-oriented recommendations for browsers, operating systems, communication, DNS, authentication, storage, and other parts of a modern software stack.
  </li>

  <li id="note-10">
    <strong>F-Droid</strong><br />
    F-Droid Project<br />
    <a href="https://f-droid.org/" target="_blank" rel="noopener noreferrer">https://f-droid.org/</a><br />
    A repository and distribution ecosystem for free and open-source Android applications.
  </li>

  <li id="note-11">
    <strong>Awesome Privacy</strong><br />
    Community-maintained resource<br />
    <a href="https://github.com/pluja/awesome-privacy" target="_blank" rel="noopener noreferrer">https://github.com/pluja/awesome-privacy</a><br />
    A broad community-curated collection of privacy-respecting alternatives and self-hostable tools. Individual projects should still be evaluated on their own merits.
  </li>

  <li id="note-12">
    <strong>JustDeleteMe</strong><br />
    Community project<br />
    <a href="https://justdeleteme.xyz/" target="_blank" rel="noopener noreferrer">https://justdeleteme.xyz/</a><br />
    A directory of direct account-deletion links and information about how difficult different services make account deletion.
  </li>

  <li id="note-13">
    <strong>Your Digital Rights</strong><br />
    noyb – European Center for Digital Rights<br />
    <a href="https://yourdigitalrights.org/" target="_blank" rel="noopener noreferrer">https://yourdigitalrights.org/</a><br />
    A practical service for generating privacy and data-erasure requests to companies, including GDPR requests for European users.
  </li>

  <li id="note-14">
    <strong>Article 17 GDPR – Right to Erasure</strong><br />
    European Union / GDPR.eu<br />
    <a href="https://gdpr.eu/article-17-right-to-be-forgotten/" target="_blank" rel="noopener noreferrer">https://gdpr.eu/article-17-right-to-be-forgotten/</a><br />
    The legal basis behind many of the deletion requests described in this workflow. Article 17 gives data subjects a right to request erasure in applicable circumstances, subject to a number of exceptions.
  </li>

  <li id="note-15">
    <strong>Article 12 GDPR – Transparent Information and Exercise of Data-Subject Rights</strong><br />
    European Union / GDPR.eu<br />
    <a href="https://gdpr.eu/article-12-how-to-exercise-the-rights-of-the-data-subject/" target="_blank" rel="noopener noreferrer">https://gdpr.eu/article-12-how-to-exercise-the-rights-of-the-data-subject/</a><br />
    Covers how controllers must facilitate data-subject rights and the general one-month timeframe for responding to requests.
  </li>
</ol>

---

## Discussion

If you have done a similar audit, I am interested in the parts that were unexpectedly difficult: the accounts you had forgotten, the identity provider that held too much together, and the service that turned out to be absurdly hard to leave.
