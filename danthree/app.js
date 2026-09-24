/* Danthree UI. Upstream engine attribution is retained in LICENSE-Online3DViewer.md. */
(function(){
'use strict';
const params=new URLSearchParams(location.search);
const requested=params.get('lang')||navigator.language.slice(0,2);
const lang=['de','en','fr','it'].includes(requested)?requested:'en';
const strings=__DANTHREE_LOCALIZATION__;
OV.Engine.SetLocalizedStrings(strings);OV.Engine.SetLanguageCode(lang);
OV.SetWebsiteEventHandler(()=>{});
const copy={
de:{eyebrow:'DANTHREE STUDIO TOOLS',intro:'Prüfe Geometrie, Materialien und Ansichten direkt im Browser.',open:'Dateien auswählen',dropHint:'Oder klicken, um eine 3D-Datei zu öffnen.',dropHintMobile:'Antippen und 3D-Datei öffnen.',formatLabel:'Unterstützte Dateiformate',files:'Bei mehrteiligen Modellen wähle die Modelldatei und ihre Texturen gemeinsam aus.',local:'Lokale Dateien bleiben in deinem Browser.',controls:'Bedienung und Dateiformate',navigation:'Ziehe zum Drehen, scrolle zum Zoomen. Auf dem Touchscreen kannst du mit zwei Fingern zoomen und verschieben.',formats:'Auch 3DS, 3MF, AMF, BIM, BREP, DAE, IFC, FCStd, OFF, PLY und WRL werden unterstützt. Nicht jedes Material oder jede Funktion eines Dateiformats lässt sich darstellen.',studio:'Du brauchst Produktbilder oder Animationen auf Basis deines 3D-Modells?',contact:'Projekt anfragen',url:'/kontakt',based:'Basiert auf',language:'Sprache'},
en:{eyebrow:'DANTHREE STUDIO TOOLS',intro:'Inspect geometry, materials, and views directly in your browser.',open:'Choose files',dropHint:'Or click to open a 3D file.',dropHintMobile:'Tap to open a 3D file.',formatLabel:'Supported file formats',files:'For multi-file models, select the model and its textures together.',local:'Local files stay in your browser.',controls:'Navigation and file formats',navigation:'Drag to rotate, scroll to zoom. On touchscreens, use two fingers to zoom and pan.',formats:'Also supports 3DS, 3MF, AMF, BIM, BREP, DAE, IFC, FCStd, OFF, PLY, and WRL. Not every material or feature of a file format can be displayed.',studio:'Need product imagery or animation built from your 3D model?',contact:'Discuss your project',url:'/en/contact',based:'Based on',language:'Language'},
fr:{eyebrow:'DANTHREE STUDIO TOOLS',intro:'Examine la géométrie, les matériaux et les vues directement dans ton navigateur.',open:'Choisir des fichiers',dropHint:'Ou clique ici pour ouvrir un fichier 3D.',dropHintMobile:'Appuie ici pour ouvrir un fichier 3D.',formatLabel:'Formats de fichiers pris en charge',files:'Si le modèle comprend plusieurs fichiers, sélectionne le modèle et ses textures ensemble.',local:'Les fichiers locaux restent dans ton navigateur.',controls:'Navigation et formats de fichiers',navigation:'Fais glisser pour tourner, utilise la molette pour zoomer. Sur un écran tactile, utilise deux doigts pour zoomer et déplacer la vue.',formats:'Les formats 3DS, 3MF, AMF, BIM, BREP, DAE, IFC, FCStd, OFF, PLY et WRL sont aussi pris en charge. Certains matériaux ou certaines fonctions d’un format peuvent ne pas s’afficher.',studio:'Tu as besoin de visuels produit ou d’animations à partir de ton modèle 3D ?',contact:'Parlons de ton projet',url:'/fr/contact',based:'Basé sur',language:'Langue'},
it:{eyebrow:'DANTHREE STUDIO TOOLS',intro:'Esamina geometria, materiali e viste direttamente nel browser.',open:'Scegli i file',dropHint:'Oppure clicca qui per aprire un file 3D.',dropHintMobile:'Tocca qui per aprire un file 3D.',formatLabel:'Formati di file supportati',files:'Se il modello comprende più file, seleziona insieme il modello e le sue texture.',local:'I file locali restano nel tuo browser.',controls:'Navigazione e formati dei file',navigation:'Trascina per ruotare, scorri per ingrandire. Sugli schermi touch, usa due dita per ingrandire e spostare la vista.',formats:'Sono supportati anche 3DS, 3MF, AMF, BIM, BREP, DAE, IFC, FCStd, OFF, PLY e WRL. Non tutti i materiali o le funzioni di un formato possono essere visualizzati.',studio:'Ti servono immagini di prodotto o animazioni a partire dal tuo modello 3D?',contact:'Parliamo del tuo progetto',url:'/it/contatto',based:'Basato su',language:'Lingua'}};
window.addEventListener('DOMContentLoaded',()=>{
 const c=copy[lang];document.documentElement.lang=lang;
 document.querySelectorAll('[data-dt]').forEach(el=>{el.textContent=c[el.dataset.dt]||el.textContent;});
 document.getElementById('dt-contact').href='https://www.danthree.studio'+c.url;
 const select=document.getElementById('dt-language');select.value=lang;select.setAttribute('aria-label',c.language);
 select.addEventListener('change',()=>{const next=new URL(location.href);next.searchParams.set('lang',select.value);location.href=next.href;});
 const drop=document.getElementById('dt-dropzone');drop.setAttribute('aria-label',c.open);
 document.querySelector('.dt-format-grid').setAttribute('aria-label',c.formatLabel);
 drop.addEventListener('click',()=>document.getElementById('open_file').click());
 drop.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();document.getElementById('open_file').click();}});
});
OV.StartWebsite({allowEmbedding:true});
})();
