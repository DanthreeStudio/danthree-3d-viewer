"""Build Danthree's static viewer from the bundled upstream engine.
No credentials, tracking, forms or backend services are added.
Fonts are copied from an authorized local Webflow export, never to source control.
"""
from pathlib import Path
import argparse,json,re,shutil,zipfile
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--webflow-export',type=Path,required=True,help='Authorized local Webflow ZIP containing licensed site fonts; never committed.')
args=parser.parse_args()
root=Path(__file__).resolve().parents[1];out=root/'build'/'danthree'
# This is generated output only. A clean build prevents test fixtures entering deployment.
if out.exists(): shutil.rmtree(out)
out.mkdir(parents=True)
shutil.copytree(root/'build/website',out/'o3dv',dirs_exist_ok=True)
shutil.copytree(root/'website/assets/envmaps',out/'assets/envmaps',dirs_exist_ok=True)
(out/'assets/fonts').mkdir(parents=True,exist_ok=True)
with zipfile.ZipFile(args.webflow_export) as z:
 for n in ['FuturaPTBook.otf','FuturaPTDemi.otf']:(out/'assets/fonts'/n).write_bytes(z.read('fonts/'+n))
shutil.copyfile(root/'LICENSE.md',out/'LICENSE-Online3DViewer.md')
# Preserve the notices of dependencies included in the browser bundle.
licenses = [
 ('three.js',root/'node_modules/three/LICENSE'),
 ('Pickr',root/'node_modules/@simonwep/pickr/LICENSE'),
 ('fflate',root/'node_modules/fflate/LICENSE'),
 ('Quicksand',root/'website/info/css/Quicksand/OFL.txt'),
]
(out/'THIRD-PARTY-NOTICES.txt').write_text('\n\n'.join(name+'\n'+path.read_text() for name,path in licenses))

shutil.copyfile(root/'danthree/design.css',out/'danthree.css')
shutil.copyfile(root/'danthree/app.js',out/'danthree.js')
shutil.copyfile(root/'danthree/localization.json',out/'localization.json')
h=(root/'website/index.html').read_text()
h=h.replace('<html>','<html lang="en">').replace('width=device-width, user-scalable=no','width=device-width, initial-scale=1')
h=re.sub(r'    <link rel="icon".*?\n','',h)
h=re.sub(r'    <link rel="canonical".*?\n','',h)
h=h.replace('<title>Online 3D Viewer</title>','<title>Danthree Studio | 3D Viewer</title>\n    <meta name="robots" content="noindex,follow">')
h=re.sub(r'<!-- website start -->.*?<!-- website end -->','<link rel="stylesheet" href="o3dv/o3dv.website.min.css">\n<link rel="stylesheet" href="danthree.css">\n<script src="o3dv/o3dv.website.min.js"></script>\n<script src="danthree.js"></script>',h,flags=re.S)
h=re.sub(r'<!-- website analytics start -->.*?<!-- website analytics end -->','',h,flags=re.S)
h=re.sub(r'    <script type="text/javascript">\s*OV.StartWebsite \(\);\s*</script>','',h)
a=h.index('            <div class="intro_logo">');b=h.index('            <!-- intro footer end -->',a)+len('            <!-- intro footer end -->')
h=h[:a]+'''            <div id="dt-dropzone" role="button" tabindex="0" aria-label="Choose files">
              <h1 id="intro_dragdrop_text">Drop your 3D model here</h1>
              <p class="dt-drop-hint"><span class="dt-desktop-hint" data-dt="dropHint">Or click to open a 3D file.</span><span class="dt-mobile-hint" data-dt="dropHintMobile">Tap to open a 3D file.</span></p>
              <ul class="dt-format-grid" aria-label="Supported file formats">
                <li>GLB / glTF</li><li>OBJ</li><li>FBX</li><li>STL</li><li>STEP</li><li>IGES</li>
                <li>3DM</li><li>3DS</li><li>3MF</li><li>AMF</li><li>BIM</li><li>BREP</li>
                <li>DAE</li><li>FCStd</li><li>IFC</li><li>OFF</li><li>PLY</li><li>WRL</li>
              </ul>
              <p class="dt-file-note" data-dt="local">Local files stay in your browser.</p>
            </div>
            <details class="dt-help"><summary data-dt="controls">Navigation and file formats</summary><p data-dt="files">For multi-file models, select the model and its textures together.</p><p data-dt="navigation">Drag to rotate, scroll to zoom. On touchscreens, use two fingers to zoom and pan.</p><p data-dt="formats">Not every material or feature of a file format can be displayed.</p></details>
            <div id="intro_formats_title" hidden></div>
            <div class="dt-studio-note"><p data-dt="studio">From a product model to a visual language for your brand.</p><a class="dt-button dt-contact" id="dt-contact" href="https://www.danthree.studio/en/contact" target="_top" data-dt="contact">Discuss your project</a></div>
''' +h[b:]
h=re.sub(r'<div class="title_left">.*?</div>', '<div class="title_left"></div>', h, flags=re.S)
(out/'index.html').write_text(h)
(out/'robots.txt').write_text('User-agent: *\nDisallow: /\n')
# Localization is inline data from our source file, no asynchronous race at startup.
js=(out/'danthree.js').read_text().replace('__DANTHREE_LOCALIZATION__',(root/'danthree/localization.json').read_text())
(out/'danthree.js').write_text(js)
print(out)
