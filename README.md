# Top Snagger

A simple phone app for recording site snags (defects, incomplete works, damage) with photos and voice notes, then building an editable snagging report.

- Take one or more photos per snag, then dictate or type the location, the issue, the action required and who is responsible.
- Snags are saved on the phone (IndexedDB) and work offline once the app has been opened.
- Select snags to build a report, edit it, then download it as a Word (.docx) file, print it or save it as a PDF, or share it.
- Back up and restore all snags from the ⋯ menu.

## Layout

- `src/app.html`: the app source (single file).
- `build.sh`: builds `docs/index.html` from the source. Run `sh build.sh` after editing `src/app.html`.
- `docs/`: the published app, served by GitHub Pages (service worker, manifest, icons and a local copy of the docx library).

When you change the app, bump `CACHE` in `docs/sw.js` so phones pick up the new version.
