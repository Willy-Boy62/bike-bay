# Bike-Bay

Bike-Bay is a local-first bicycle parking manager. It tracks available and occupied bays, supports check-in and check-out, validates bike tags, and stores data in browser storage.

## Requirements
Node 20 and npm.

## Start
`npm install` then `npm run dev`.

## Scripts
`npm run check` runs typecheck, lint, tests, and build. `npm run test:zones` runs tests under UTC and America/Chicago.

## Data handling
Storage key: `bike-bay:v1`. Schema version: 1. Damaged records are moved to a timestamped backup key. Demo data is used when no saved record exists.

## Project layout
`src/domain` contains pure rules and tests; `src/storage` contains persistence; UI is in `src/App.tsx`.

## Limitations
This app is single-browser local storage only and has no authentication or network synchronization.


## Development note 7
Add memory storage.
