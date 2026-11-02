SUMMIT INTERACTIVE WEBSITE — UPDATED

Start file: server.js
Node: 22+ recommended; no npm dependencies required.

Clean page URLs:
  /                 Home
  /about            About
  /teslaobby        Tesla Roadster Obby

Unknown URLs return the custom 404: Not found page with a home button and HTTP 404 status. Old .html URLs redirect to clean URLs.

Image loading improvements:
- Optimized WebP assets are included in assets/images.
- Above-the-fold banner art is preloaded with high priority.
- Below-the-fold images use lazy loading and async decoding.
- Images include dimensions to reduce layout shifts.
- Static images are cacheable by the browser.

The banner and Roadster artwork included here are lightweight starter illustrations. Replace banner.png, gamebanner.png, and gameicon.png with your final art if desired, keeping the filenames. Logo assets are cropped from the Summit Interactive logo sheet and optimized as WebP.
