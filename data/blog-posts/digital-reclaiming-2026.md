---
title: "Reclaiming Your Digital Life"
subtitle: "Why I'm deleting old accounts and finding out how much control I actually have."
date: "2026-08-05"
author: "Velitchko Filipov"
hashtags:
  - privacy
  - digital-sovereignty
categories:
  - Privacy
  - Technology
  - Opinion
excerpt: "I started deleting old accounts and expected boring GDPR admin. Instead I found broken forms, dead login systems, support loops, and a much clearer picture of how hard it is to leave."
featured: true
---

# Reclaiming Your Digital Life

Over the past few weeks I've done something I had never seriously attempted before.

I've started deleting myself from the internet.

Not in a dramatic "I'm leaving technology" sense. Quite the opposite. I work in AI, visualization, and software. Technology is central to my research and my daily life.

What I am trying to leave behind is the assumption that every company should profile me and keep my personal data indefinitely because I once created an account. Or because I logged in with Google OAuth once and then forgot the service existed.

To date I have sent hundreds of GDPR erasure requests to companies whose services I no longer use. Some processed the request within days. Others required manual verification. Many sent me through broken forms, non-functional login systems, or support loops that looked almost designed to make leaving boring enough that I would stop.

> Person A: Please contact email/person B<br/>
> Person B: Please contact email/person A

A surprising number simply never replied.

One request has involved more than 37 emails. Another has bounced between departments for weeks. Several companies pointed me toward forms that do not work, maybe never worked, and then asked me to use those same forms again. Others required me to repeatedly prove my identity just to delete an account I could no longer access because their own authentication systems were broken.

<mark>None of this should be normal.</mark>

And yet it is.

---

## The experiment

The rules were simple. For every service I no longer use, I first try to delete the account through the web interface. If that fails, I look for a support address or data protection officer contact and request deletion of the account and associated personal data. Then I record what happened.

I expected three possible outcomes:

1. The company deletes my account.
2. The company explains why it legally cannot delete some data.
3. The company asks me to verify my identity.

Instead I discovered a fourth possibility.

**The process itself often does not work.**

Some observations after only a few weeks:

- Login systems no longer worked.
- Google OAuth authentication silently failed.
- Password recovery mechanisms were broken.
- Privacy forms redirected to dead links.
- Privacy policies had placeholder text that looked like it was never meant to be published.
- Some services had no public-facing privacy form or terms of service.
- Some privacy forms did not include the required information about data processing.
- Customer support redirected me to privacy, and privacy redirected me back to customer support.
- Departments repeatedly requested information they already had.
- Identity verification sometimes required more personal information than the account needed in the first place.
- Some companies never replied. Some listed email addresses bounced.
- Others handled everything professionally within a single day. Praise where it is due.

The strange part was that the hard cases were not always the companies with the most sensitive data. Sometimes the companies legally required to retain certain records gave the clearest explanations. The worst cases were often the ordinary services that seemed to have optimized account creation down to seconds and then never built a serious exit.

The funniest, in the bleak sense, was the automated "sad to see you go" email after a deletion request finally succeeded.

Sorry, not sorry. I am extremely fine being deleted from your service.

---

## What deletion reveals

Like most people, I have accumulated online accounts for years.

Some existed for a single purchase. Some were created to try a piece of software. Some existed because a website insisted that creating an account was the only way forward. Most of them had long disappeared from my memory.

Unfortunately, my data had not.

Every account leaves something behind: name, email address, billing information, support conversations, purchase history, device identifiers, IP addresses, location signals, analytics, telemetry, behavioral data. Most of it is uninteresting on its own. At scale it becomes a profile of where I have been, what I tried, what I bought, what I asked for, and which systems I depended on.

The question that started this project was simple:

> **If I no longer use a service, why should it continue storing my personal information?**

GDPR gives me a mechanism to ask that question formally. Article 17 is useful because it turns "please delete my account" into a right that organizations have to handle; Article 12 says organizations generally have one month to respond.<sup>[1](#note-1)</sup> But the experience quickly stopped being only about legal compliance.

The law is not the part that surprised me.

The organizational reality did.

That range was revealing. The good cases were short and boring: a confirmation, a clear explanation of what could be deleted, and sometimes a note about what had to be retained. The bad cases were not dramatic. They were dead portals, repeated forms, missing ownership, and the feeling that nobody inside the organization had ever tried to follow its own deletion process.

This is not really a story about villainous companies hovering over a database. It is more boring, and probably more common: technical debt, fragmented responsibility, cheap storage, old authentication systems, abandoned privacy pages, and internal processes that were never tested by someone who actually tried to leave.

Creating an account has been optimized because every additional click risks losing a user.

Deleting one often still feels like a favor.

---

## Beyond GDPR

At some point I realized the project had become larger than a collection of deletion requests.

GDPR is the tool. It is not the reason I started.

What I actually want to understand is where my personal data lives, who still holds it, why it is still being retained, and how much control I have over my own digital identity once the easy opt-out buttons run out.

That is what I mean by digital sovereignty here. Not disappearing from the internet. Not pretending every cloud service is bad. Not building a bunker out of self-hosted dashboards.

Just being more deliberate about the services I depend on, the accounts I leave behind, and the amount of trust I give to organizations that no longer provide me with value.

The AI angle makes this harder to ignore. Data that used to be treated as exhaust now has new uses: training, profiling, personalization, risk scoring, recommendation, automation. A support conversation or abandoned profile may be useless to me, but that does not mean it has no value to someone else.

So the question is no longer simply whether companies collect data.

It is whether leaving a service should also mean leaving its memory.

---

## Start small

You do not need to disappear from the internet overnight.

Start with one old account and treat it as a small audit.

Here is the checklist I would use now:

- [ ] Pick one low-risk account you no longer use. Do not start with banking, tax, university, health, or anything where losing access would be a genuine problem.
- [ ] Check how you logged in: password, Google OAuth, Apple ID, GitHub, Facebook, or something else. OAuth accounts are especially easy to forget because they may not have a normal password.
- [ ] Look for a direct deletion path in the account settings. If you cannot find it, check a directory such as JustDeleteMe before opening a support ticket.<sup>[2](#note-2)</sup>
- [ ] If there is no usable deletion path, send a short erasure request through the privacy contact, DPO address, or a service such as Your Digital Rights.<sup>[3](#note-3)</sup>
- [ ] Keep a simple log: company, account email, login method, request date, contact address, ticket number, response, and follow-up date.
- [ ] If the company asks for identity verification, check whether the request is proportionate. Deleting a throwaway account should not require handing over more data than the account ever had.
- [ ] If there is no reply after a month, follow up once with the original request date and ticket number. The point is to make the timeline visible.
- [ ] Check the email address in Have I Been Pwned, then rotate passwords and enable two-factor authentication where the account is worth keeping.<sup>[4](#note-4)</sup>
- [ ] Review one service you actively use: privacy settings, ad personalization, public profile fields, connected apps, location history, and email notification settings.
- [ ] Replace one recurring service only if there is a better trade-off. Privacy Guides and EFF's Surveillance Self-Defense are useful starting points, but copying someone else's setup blindly is just another way to stop thinking.<sup>[5](#note-5)</sup>
- [ ] Before buying a new connected device or app, check whether someone has already reviewed its privacy behavior. Mozilla's *Privacy Not Included* is useful for that kind of first pass.<sup>[6](#note-6)</sup>

The log matters more than it sounds. Once you write things down, patterns become visible quickly: which companies respond clearly, which ones route you through support theatre, which ones ask for more data than they need, and which ones cannot delete you because their own systems have forgotten how you logged in.

The point is not to become perfectly private. I still use cloud services. I still use proprietary software. I still choose convenience when the trade-off makes sense.

But I want those choices to be choices.

For me, reclaiming my digital life starts there: with old accounts, broken deletion workflows, and the mildly absurd realization that leaving the internet is often much harder than joining it.

---

## Notes & References

Below is a short list of resources referenced above.

<ol>

<li id="note-1">
<strong>European Commission - Dealing with requests from individuals</strong><br/>
European Commission<br/>
<a href="https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/dealing-requests-individuals_en" target="_blank">https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/dealing-requests-individuals_en</a><br/>
Explains how organizations should handle GDPR data-subject requests, including response timing.
</li>

<li id="note-2">
<strong>JustDeleteMe</strong><br/>
JustDeleteMe community directory<br/>
<a href="https://justdeleteme.xyz/" target="_blank">https://justdeleteme.xyz/</a><br/>
A directory of direct account-deletion links and notes on how difficult different services make deletion.
</li>

<li id="note-3">
<strong>Your Digital Rights</strong><br/>
noyb - European Center for Digital Rights<br/>
<a href="https://yourdigitalrights.org/" target="_blank">https://yourdigitalrights.org/</a><br/>
Generates access, deletion, and other privacy requests for organizations across different jurisdictions.
</li>

<li id="note-4">
<strong>Have I Been Pwned</strong><br/>
Troy Hunt<br/>
<a href="https://haveibeenpwned.com/" target="_blank">https://haveibeenpwned.com/</a><br/>
Checks whether an email address appears in known public data breaches and can notify you about future breaches.
</li>

<li id="note-5">
<strong>Privacy Guides and Surveillance Self-Defense</strong><br/>
Privacy Guides / Electronic Frontier Foundation<br/>
<a href="https://www.privacyguides.org/en/" target="_blank">https://www.privacyguides.org/en/</a><br/>
<a href="https://ssd.eff.org/" target="_blank">https://ssd.eff.org/</a><br/>
Practical starting points for choosing privacy-respecting tools and understanding basic threat modeling.
</li>

<li id="note-6">
<strong>Mozilla Privacy Not Included</strong><br/>
Mozilla Foundation<br/>
<a href="https://foundation.mozilla.org/en/privacynotincluded/" target="_blank">https://foundation.mozilla.org/en/privacynotincluded/</a><br/>
Consumer product privacy reviews for connected devices, apps, toys, cars, and other services.
</li>

</ol>
