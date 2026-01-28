# Ration Website

This repo contains the static site for Ration. The pages live at the repo root and use shared assets in `assets/`.

## Config

Config lives in `assets/js/site-config.js` as `window.RATION_CONFIG`.

Available flags:
- `hideFeedingSystems`: hides the feeding systems chip list on the RationFeed page. That is the list of feeding systems that we have connected to in the past.
- `hideHomeContactForm`: hides the contact form section on the home page (and the CTA link to it).
- `hideRationfeedSpecSheet`: hides the “Spec sheet: Download detailed specifications …” line on the RationFeed page.

Set a flag to `true` to hide that element.

## Deployment

Pushing to the `main` branch publishes the site (GitHub Pages).
