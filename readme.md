# JG.js

This repo is a collection of utility scripts developed by Jacob Graham to speed up the implementation of several common js tasks.  These include:

* Opening/closing dialogs.
* Ajax form submission.
* Honeypot input.
* Loader.
* Ajax flash message shower.

This is an ongoing project.

## JG Modal (jg_modal.js)

jg_modal.js automates many of the basic features involved in implementing modals.  It makes use of the html dialog element, and automates the process of making a button open the modal, and of inserting a close button inside the modal.

Specify that a dialog element should be targeted by jg_modal.js by adding the *jg_modal* class to it.
```html
<button onclick="dialog1.showModal()">Show Modal</button>

<dialog class="jg_modal" id="dialog1" style="padding: 1rem;">
    <h1>Example Dialog</h1>
</dialog>
```
When the "Show Modal" button is clicked, the modal will be opened.  When it opens, you will see that a working close button was automatically generated for the modal by jg_modal.js.

It turns out, jg_modal.js has an esier way to specify that a button should open a modal.  Replace the "Show Modal" buttton with this one:
```html
<button jg_open="dialog1">Show Modal</button>
```
The *jg_open* attribute should be set to the id of the *jg_dialog* element you wish for the button to open.



If you wish to modify the html content of the close button (by default it is a simple html times character), simply define a template with an id of *jg_close_btn_content*.  jg_modal.js will automatically add the content of this template to the close button.
```html
<template id="jg_close_btn_content">
    <i class="fa-solid fa-sm fa-x"></i>
</template>
```

If you want to style the close button, simply target the *jg_modal_close_btn* class.

## JG Loader (jg_loader.js)

TODO: