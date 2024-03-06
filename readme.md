# JG.js

This repo is a collection of utility scripts developed by Jacob Graham to speed up the implementation of several common js tasks.  These include:

* Opening/closing modals. ✅
* Ajax form submission.
* Honeypot input. ✅
* Loader. ✅
* Toast/alert system.

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

It turns out, jg_modal.js has an easier way to specify that a button should open a modal.  Replace the "Show Modal" button with this one:
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

jg_loader.js is a simple script containing a single function: *jg_get_loader*.  This function creates a loader element, and returns the object, where it can then be used however the programmer desires within the javascript.
```html
<button onclick="async_task(event)">Show Modal</button>

<div id="loader_container"></div>

<script>
async function async_task(event){

    let container = document.getElementById('loader_container')
    let loader = jg_get_loader()
    container.innerHTML = ""
    container.appendChild(loader)

    //execute some async task here...

    container.innerHTML = ""

    //do something with the result
}
</script>
```

There is a default loader for when no custom content is defined.  To customize the content of the loader, define a template in the body of your document with an id of *jg_loader_content*.

```html
<template id="jg_loader_content">
    <i class="fa-solid fa-xl fa-gear fa-spin"></i>
</template>
```

To style the loader content, target the *jg_loader* class.

## JG Honeypot (jg_honeypot.js)

jg_honeypot.js adds invisible inputs, called honeypots, to forms to help limit spam submissions, while at the same time maintaining a positive user experience.  The idea is that we style the inputs in such a way that the user would not be able to see them to fill them out.  But, bots will see them in the html source and fill them out.  Then, when the form is submittted, the script checks if any of the honeypots trapped a bot, and notifies the server through the use of the *jg_honeypot_failed* input name in the request.  The server can read from this input to decide whether it will fulfill the request or not.

To use the features of this script, all you need to do is apply the *jg_honeypot_form* class to the form element you wish to enable spam protection for.  From there, jg_honeypot.js will handle the rest.  

```html
<form action="/" method="POST" class="jg_honeypot_form">
    <label for="name_input">Name</label>
    <input type="text" id="name_input" name="name">

    <label for="email_input">Email</label>
    <input type="email" id="email_input" name="email">

    <label for="message_input">Message</label>
    <input type="text" id="message_input" name="message">

    <input type="submit" value="submit">
</form>
```

Note that if you inspect a form protected by jg_honeypot.js, the name atttributes of your original inputs will be changed.  This is normal, it is jg_honeypot.js masking the true names of those inputs to bots so that the honeypot inputs look more appealing to them.  Upon submitting the form, jg_honeypot.js will automatically rectify the input names so your form works as expected.
