# Content Source of Truth

## Objective

Use the existing workspace's information about projects and certificates. This document explains the reconciliation process; it is not a replacement data catalogue.

## Inventory steps

1. Search for project/certificate manifests, arrays, content folders, markdown case studies, JSON, YAML, TypeScript data files, PDFs/images, screenshots, certificates, CV/resume material and deployed website links.
2. Search folder names and file contents for each known title/variant: `MediStudyGo`, `Phoney`, `Phoney`, `TruGifting`, `True Gifting`, `Masterplayer`, `Master Player`, `OmniRoute`, `Session Sync`, and certificate/credential/issuer/verification terms.
3. Do not open, echo or copy the contents of `.env`, keys, tokens, signing material, private credentials or other secrets. URLs from config should be sanitized if they contain tokens.
4. Build a source map that records each content item, its current source file, all related assets, outbound links, confidence/verification notes, and whether it is a project, credential, employment record or independent/open-source project.
5. Preserve all existing items. Resolve duplicate entries by reusing their canonical ID/slug if one exists. If conflict cannot be resolved from local evidence, flag it for Avichal instead of silently selecting one.
6. Only after this audit, propose whether to retain the current manifest or create a single consolidated data source. Do not migrate until the owner approves the source map.

## Canonical featured order

1. MediStudyGo — previous work.
2. Phoney — personal app in beta; first Android app; tester invitation.
3. TruGifting Solutions — independent project started after MediStudyGo.
4. Masterplayer Designs & Printing — current collaboration.

OmniRoute Session Sync belongs in the additional-project archive by default, not among these four featured stories, unless Avichal changes that instruction. Continue showing all other inventory items in the relevant archive/category.

## Links supplied by the owner

- MediStudyGo: https://medistudygo.com/
- Phoney: https://phoney.avichalgoyal.me/
- Phoney repository: https://github.com/avichal15/calling-app-
- TruGifting Solutions: https://trugiftingsolutions.com/
- Masterplayer Designs & Printing: https://masterplayerprints.com/
- Masterplayer repository: https://github.com/avichal15/Masterplayer
- OmniRoute Session Sync repository: https://github.com/avichal15/omniroute-session-sync
- GitHub profile: https://github.com/avichal15

Validate every link before launch. A supplied URL is a starting point, not proof that a page or feature currently works.

## Data fields to preserve if present

`id`, `slug`, `title`, `kind`, `featuredOrder`, `status`, `role`, `organization`, `dateStart`, `dateEnd`, `summary`, `problem`, `contribution`, `features`, `techStack`, `results`, `disclosures`, `thumbnail`, `screenshots`, `mobileScreenshots`, `liveUrl`, `repositoryUrl`, `documentationUrl`, `certificateIssuer`, `credentialUrl`, `credentialId`, `issueDate`, `expiryDate`, `localEvidencePath`, `relatedItems`, `verifiedAt`.

These are recommended fields, not permission to fill unknown values. The agent must adapt them to the current data model.

## Claim discipline

- Use first-person statements such as “I built,” “I integrated,” “I contributed to,” or “I'm currently working on” according to evidence.
- Label work as employment, freelance/client work, personal project, open-source contribution or ongoing collaboration accurately.
- For quantitative results, require a local source or explicit user confirmation.
- For certificates, only show issuer, ID, date and verification link where they are found in the evidence.
- A website or repository may have changed after documentation was written; verify current release status before calling something shipped or production-ready.
