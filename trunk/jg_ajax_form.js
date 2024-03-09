//mark for initialization
window.jg_js[window.JG_AJAX_FORM_KEY] = true
//define constants
const JG_AJAX_METHOD_ATTR_NAME = 'jg_ajax_method' //attribute used to specify the method of an ajax form
const JG_AJAX_RESPONSE_HANDLER_ATTRNAME = 'jg_ajax_response_handler' //attribute used to specify a function to handle the response from an ajax request

//animation used by the default loader

//this init function is called in jg.js, do not call it directly!
function __init_jg_ajax_form(e){
    //apply ajax form submission to forms
    jg_apply_ajax_get()
    jg_apply_ajax_post()
}

/*
This function finds all forms with JG_AJAX_METHOD_ATTR_NAME = 'get' and adds an event listener to submit the form via an ajax get request.
When the request is done submitting, if there is an attribute JG_AJAX_RESPONSE_HANDLER_ATTRNAME set on the form element, that function will be
called with the submit event and the ajax response data passed in.
*/
function jg_apply_ajax_get(){
    //get forms
    let forms = Array.from(document.querySelectorAll(`form[${JG_AJAX_METHOD_ATTR_NAME}="GET"]`))
    console.log("FAASDF", forms)
    //for each form...
    forms.map((form)=>{
      //add onsubmit event listener to form to submit form via ajax
        form.addEventListener('submit', async (event)=>{
            event.preventDefault()

            //get formdata to submit
            let form_data = new FormData(event.target)
            const form_obj = {};
            form_data.forEach((value, key) => {
                form_obj[key] = value;
            });

            const params = new URLSearchParams(form_data).toString()

            //get form action
            const form_action = form.getAttribute('action');

            //submit form data via ajax get request
            const response = await fetch(form_action + "?" + params, {
                method: 'GET'
            })
            const data = await response.json()

            //call response handler function
            const handler = eval(form.getAttribute(JG_AJAX_RESPONSE_HANDLER_ATTRNAME))
            if (handler && typeof handler === 'function') handler(event, data)
        });
    });
}
/*
This function finds all forms with JG_AJAX_METHOD_ATTR_NAME = 'post' and adds an event listener to submit the form via an ajax post request.
*/
function jg_apply_ajax_post(){
    
    //get forms
    let forms = Array.from(document.querySelectorAll(`form[${JG_AJAX_METHOD_ATTR_NAME}="POST"]`))

    //for each form...
    forms.map((form)=>{
      //add onsubmit event listener to form to submit form via ajax
        form.addEventListener('submit', async (event)=>{
            event.preventDefault()

            //get formdata to submit
            let form_data = new FormData(event.target)
            const form_obj = {};
            form_data.forEach((value, key) => {
                form_obj[key] = value;
            });

            //get form action
            const form_action = form.getAttribute('action');

            //submit form data via ajax post request
            const response = await fetch(form_action, {
                method: 'POST',
                body: JSON.stringify(form_obj)
            })
            const data = await response.json()

            //call response handler function
            const handler = eval(form.getAttribute(JG_AJAX_RESPONSE_HANDLER_ATTRNAME))
            if (handler && typeof handler === 'function') handler(event, data)
        });
    });
}


