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
de:{eyebrow:'DANTHREE STUDIO TOOLS',intro:'Prüfe Geometrie, Materialien und Ansichten direkt im Browser.',open:'Dateien auswählen',files:'Bei mehrteiligen Modellen wähle die Modelldatei und ihre Texturen gemeinsam aus.',local:'Dateien von deinem Gerät werden im Browser verarbeitet.',controls:'Bedienung und Dateiformate',navigation:'Ziehe zum Drehen, scrolle zum Zoomen. Auf dem Touchscreen kannst du mit zwei Fingern zoomen und verschieben.',formats:'Auch 3DS, 3MF, AMF, BIM, BREP, DAE, IFC, FCStd, OFF, PLY und WRL werden unterstützt. Nicht jedes Material oder jede Funktion eines Dateiformats lässt sich darstellen.',studio:'Vom Produktmodell zur Bildsprache deiner Marke.',contact:'Projekt besprechen',url:'/kontakt',based:'Basiert auf',language:'Sprache'},
en:{eyebrow:'DANTHREE STUDIO TOOLS',intro:'Inspect geometry, materials, and views directly in your browser.',open:'Choose files',files:'For multi-file models, select the model and its textures together.',local:'Files opened from your device are processed in your browser.',controls:'Navigation and file formats',navigation:'Drag to rotate, scroll to zoom. On touchscreens, use two fingers to zoom and pan.',formats:'Also supports 3DS, 3MF, AMF, BIM, BREP, DAE, IFC, FCStd, OFF, PLY, and WRL. Not every material or feature of a file format can be displayed.',studio:'From a product model to a visual language for your brand.',contact:'Discuss your project',url:'/en/contact',based:'Based on',language:'Language'},
fr:{eyebrow:'DANTHREE STUDIO TOOLS',intro:'Examine la géométrie, les matériaux et les vues directement dans ton navigateur.',open:'Choisir des fichiers',files:'Si le modèle comprend plusieurs fichiers, sélectionne le modèle et ses textures ensemble.',local:'Les fichiers de ton appareil sont traités dans le navigateur.',controls:'Navigation et formats de fichiers',navigation:'Fais glisser pour tourner, utilise la molette pour zoomer. Sur un écran tactile, utilise deux doigts pour zoomer et déplacer la vue.',formats:'Les formats 3DS, 3MF, AMF, BIM, BREP, DAE, IFC, FCStd, OFF, PLY et WRL sont aussi pris en charge. Certains matériaux ou certaines fonctions d’un format peuvent ne pas s’afficher.',studio:'Du modèle de produit au langage visuel de ta marque.',contact:'Parlons de ton projet',url:'/fr/contact',based:'Basé sur',language:'Langue'},
it:{eyebrow:'DANTHREE STUDIO TOOLS',intro:'Esamina geometria, materiali e viste direttamente nel browser.',open:'Scegli i file',files:'Se il modello comprende più file, seleziona insieme il modello e le sue texture.',local:'I file del tuo dispositivo vengono elaborati nel browser.',controls:'Navigazione e formati dei file',navigation:'Trascina per ruotare, scorri per ingrandire. Sugli schermi touch, usa due dita per ingrandire e spostare la vista.',formats:'Sono supportati anche 3DS, 3MF, AMF, BIM, BREP, DAE, IFC, FCStd, OFF, PLY e WRL. Non tutti i materiali o le funzioni di un formato possono essere visualizzati.',studio:'Dal modello di prodotto al linguaggio visivo del tuo marchio.',contact:'Parliamo del tuo progetto',url:'/it/contatto',based:'Basato su',language:'Lingua'}};
window.addEventListener('DOMContentLoaded',()=>{
 const c=copy[lang];document.documentElement.lang=lang;
 document.querySelectorAll('[data-dt]').forEach(el=>{el.textContent=c[el.dataset.dt]||el.textContent;});
 document.getElementById('dt-contact').href='https://www.danthree.studio'+c.url;
 const select=document.getElementById('dt-language');select.value=lang;select.setAttribute('aria-label',c.language);
 select.addEventListener('change',()=>{const next=new URL(location.href);next.searchParams.set('lang',select.value);location.href=next.href;});
 document.getElementById('dt-open').addEventListener('click',()=>document.getElementById('open_file').click());
});
OV.StartWebsite({allowEmbedding:true});
})();
