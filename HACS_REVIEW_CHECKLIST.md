# HACS Integration Review Checklist

Date: 2026-08-11  
Repository: adrycapyPersonal/Multi-Channel-Light-Scheduler

## Scope

This review validates that the repository follows common standards for a Home Assistant custom integration distributed through HACS.

## Checklist

1. Repository metadata (`hacs.json`)
- Status: PASS
- Notes: Uses integration metadata only (no plugin-only `filename` key).

2. Integration package layout
- Status: PASS
- Notes: Integration code is under `custom_components/multichannel_scheduler`.

3. Valid integration manifest
- Status: PASS
- Notes: Domain, name, version, `config_flow`, dependencies, docs, issue tracker, and codeowners are present.

4. Config flow discoverability
- Status: PASS
- Notes: `config_flow.py` exists and translation resources are present (`strings.json`, `translations/en.json`).

5. Localization coverage
- Status: PASS
- Notes: Added `translations/es.json` in addition to English.

6. Frontend asset packaging
- Status: PASS
- Notes: Card bundle is generated inside the integration package at `custom_components/multichannel_scheduler/www/multichannel-scheduler-card.js`.

7. Runtime static resource registration
- Status: PASS
- Notes: Integration serves frontend files from the in-package `www` folder.

8. Build validation
- Status: PASS
- Notes: `npm run build` completes successfully.

9. Placeholder content
- Status: PASS
- Notes: Replaced example URLs and placeholder codeowner in `manifest.json`.

10. Documentation consistency
- Status: PASS
- Notes: README paths and build outputs match current packaging.

## Residual risks

1. HACS cache may still hold old metadata in existing HA installs.
2. Home Assistant restart is required after updating from HACS.
3. If the user account in `codeowners` is changed/renamed, update manifest accordingly.

## Recommended release steps

1. Commit and push this revision.
2. Create a release tag (for predictable HACS upgrades).
3. In HA: HACS -> Redownload -> Restart HA.
4. Verify discovery in Settings -> Devices & Services -> Add Integration.
