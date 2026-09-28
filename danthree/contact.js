/* Existing Webflow form only. Model data is never read or transmitted here. */
(function () {
  'use strict';
  window.addEventListener('DOMContentLoaded', function () {
    const lang = document.documentElement.lang;
    const words = {
      de: ['Projekt anfragen', 'Schließen', 'Das Formular wird geladen.', 'Vielen Dank. Wir haben deine Anfrage erhalten.', 'Zurück zum Modell', 'Du kannst das Formular auch auf unserer Kontaktseite öffnen.'],
      en: ['Discuss your project', 'Close', 'Loading the form.', 'Thank you. We have received your inquiry.', 'Back to your model', 'You can also open the form on our contact page.'],
      fr: ['Parlons de ton projet', 'Fermer', 'Chargement du formulaire.', 'Merci. Nous avons bien reçu ta demande.', 'Retour au modèle', 'Tu peux aussi ouvrir le formulaire sur notre page de contact.'],
      it: ['Parliamo del tuo progetto', 'Chiudi', 'Caricamento del modulo.', 'Grazie. Abbiamo ricevuto la tua richiesta.', 'Torna al modello', 'Puoi anche aprire il modulo sulla nostra pagina di contatto.']
    }[lang] || ['Discuss your project', 'Close', 'Loading the form.', 'Thank you. We have received your inquiry.', 'Back to your model', 'You can also open the form on our contact page.'];
    const trigger = document.getElementById('dt-contact');
    const contactUrl = new URL(trigger.href);
    const home = trigger.parentElement;
    const dialog = document.createElement('dialog');
    dialog.id = 'dt-contact-dialog';
    dialog.setAttribute('aria-label', words[0]);
    const close = document.createElement('button');
    close.type = 'button'; close.className = 'dt-contact-close';
    close.textContent = '×'; close.setAttribute('aria-label', words[1]);
    const content = document.createElement('div'); content.className = 'dt-contact-content';
    dialog.append(close, content); document.body.append(dialog);
    let frame = null, fallbackTimer = null, activeElement = null;
    function finishClose() {
      clearTimeout(fallbackTimer);
      if (activeElement && activeElement.isConnected) activeElement.focus();
    }
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', finishClose);
    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      activeElement = trigger;
      if (!frame && !content.querySelector('.dt-contact-received')) {
        const loading = document.createElement('p'); loading.className = 'dt-contact-loading';
        loading.setAttribute('role', 'status'); loading.textContent = words[2];
        frame = document.createElement('iframe'); frame.title = words[0];
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        contactUrl.searchParams.set('viewer-contact', '1');
        frame.src = contactUrl.href;
        content.replaceChildren(loading, frame);
        fallbackTimer = setTimeout(() => {
          if (!loading.isConnected) return;
          const link = document.createElement('a'); link.textContent = words[5];
          link.href = trigger.href; link.target = '_blank'; link.rel = 'noopener noreferrer';
          loading.replaceChildren(link);
        }, 15000);
      }
      dialog.showModal(); close.focus();
    });
    window.addEventListener('message', function (event) {
      if (event.origin !== contactUrl.origin || !frame || event.source !== frame.contentWindow || !event.data) return;
      if (event.data.type === 'danthree-contact-ready') {
        clearTimeout(fallbackTimer); content.querySelector('.dt-contact-loading')?.remove();
      } else if (event.data.type === 'danthree-contact-close') {
        dialog.close();
      } else if (event.data.type === 'danthree-contact-success') {
        clearTimeout(fallbackTimer);
        const receipt = document.createElement('div'); receipt.className = 'dt-contact-received';receipt.setAttribute('role','status');
        const text = document.createElement('p'); text.textContent = words[3];
        const back = document.createElement('button'); back.type='button';back.className='dt-button';back.textContent=words[4];
        back.addEventListener('click', () => dialog.close());
        receipt.append(text, back); content.replaceChildren(receipt); frame=null;back.focus();
      }
    });
    // The same single CTA remains reachable after a model replaces the start screen.
    const intro = document.getElementById('intro');
    const toolbar = document.getElementById('toolbar');
    function placeTrigger() {
      const loaded = getComputedStyle(intro).display === 'none';
      const parent = loaded ? toolbar : home;
      if (trigger.parentElement !== parent) parent.append(trigger);
      trigger.classList.toggle('dt-toolbar-contact', loaded);
    }
    new MutationObserver(placeTrigger).observe(intro, {attributes:true,attributeFilter:['style','class']});
    placeTrigger();
    // Reflow the upstream canvas when fonts or the single CTA change toolbar height.
    // Without this, its first measurement can leave an unused strip below the viewer.
    const header = document.getElementById('header');
    if (header && typeof ResizeObserver !== 'undefined') {
      let previousHeight = -1;
      new ResizeObserver(() => {
        const height = header.getBoundingClientRect().height;
        if (height === previousHeight) return;
        previousHeight = height;
        requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
      }).observe(header);
    }
  });
})();
