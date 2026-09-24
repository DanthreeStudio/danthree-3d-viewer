# Danthree Studio 3D Viewer

Based on [Online 3D Viewer](https://github.com/kovacsv/Online3DViewer), MIT licensed. The upstream source and license remain intact. No claim to authorship of the rendering/import engine.

## Build

```sh
npm ci --ignore-scripts
npm run build_website
python3 danthree/build.py --webflow-export /path/to/authorized-webflow-export.zip
```

Deploy the contents of `build/danthree/` to a static host. The Webflow export is a local build input for the studio’s licensed fonts only; do not commit that ZIP or the fonts. Build output and `node_modules` are excluded by upstream `.gitignore`.

## Model handling

Local model files are read with `FileReader.readAsArrayBuffer` and passed to the importer in the browser. This application has no upload endpoint, backend, model database or model storage. URL loading performs a GET from the user-supplied source. Libraries and environment maps are static application assets. The upstream website event handler is disabled, so file names are not sent as analytics events.

Do not add model uploads, tracking of model contents/names, or persistent model storage. Do not place customer model files in the deployed application.

## Interface

Use `?lang=de`, `en`, `fr` or `it`. A small upstream change allows intentional embedding when `StartWebsite({allowEmbedding:true})` is used; upstream default behavior stays unchanged. The studio interface adds no advertising. The studio contact link is separate from file handling and does not attach any model.

## Checks completed locally, 24 September 2026

- GLB from local file chooser: geometry and materials rendered.
- OBJ with MTL and STEP: imported and rendered.
- Desktop iframe and 390 px iframe: rendering works; mouse drag rotation and scroll zoom verified in the narrow iframe.
- DE, EN, FR and IT interface strings supplied; 169 upstream keys covered.
- Not a physical mobile-device or touchscreen test.

No deployment is implied by these local checks.

## License review

The upstream MIT license allows modification, publication, distribution and commercial use provided the copyright and permission notices are retained. The studio branding identifies this adaptation; it does not assert ownership of the upstream engine or endorsement by its author. The build includes the original license and the licenses of bundled three.js, Pickr, fflate and Quicksand. Upstream example models are not included in the production build. Runtime format parsers continue to load the upstream version-pinned libraries from jsDelivr; these are application-library downloads, not model uploads.
