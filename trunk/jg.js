/*
This script handles the initialization of all other scripts, since some scripts need to be loaded before others
for event propagation purposes.
*/
window.jg_js = {} //initialize jg_js object
window.JG_MODAL_KEY = 'jg_modal'
window.JG_LOADER_KEY = 'jg_loader'
window.JG_HONEYPOT_KEY = 'jg_honeypot'
window.JG_AJAX_FORM_KEY = 'jg_ajax_form'
window.JG_STRIPE_CHARGE_INPUT_KEY = 'jg_stripe_charge_input'
window.JG_ALERTS_KEY = 'jg_alerts'

document.addEventListener('DOMContentLoaded', (e)=>{

    /*
    Note: in order to make jg_honeypot.js, jg_stripe_charge_input.js, and jg_ajax_form.js work, they are loaded in the order specified below.
    This is because the event listeners in each script need to be added with jg_honeypot.js first, then jg_stripe_charge_input.js, then jg_ajax_form.js
    since they all involve form submission and the event listeners are added in the order the scripts are loaded.
    */


    //init jg_honeypot
    if (window.jg_js[JG_HONEYPOT_KEY]){
        try{
            __init_jg_honeypot(e)
        } catch (error) {
            console.error("Error initializing JG Honeypots:", error);
        }
    }
    //init jg_stripe_charge_input
    if (window.jg_js[JG_STRIPE_CHARGE_INPUT_KEY]){
        try{
            __init_jg_stripe_charge_input(e)
        } catch (error) {
            console.error("Error initializing JG Stripe Charge Inputs:", error);
        }
    }
    //init jg_ajax_form
    if (window.jg_js[JG_AJAX_FORM_KEY]){
        try{
            __init_jg_ajax_form(e)
        } catch (error) {
            console.error("Error initializing JG Ajax Forms:", error);
        }
    }
    //init jg_modal
    if (window.jg_js[JG_MODAL_KEY]){
        try {
            __init_jg_modal(e);
        } catch (error) {
            console.error("Error initializing JG Modals:", error);
        }
    }
    //init jg_laoder
    if (window.jg_js[JG_LOADER_KEY]){
        try{
            __init_jg_loader(e)
        } catch (error) {
            console.error("Error initializing JG Loaders:", error);
        }
    }
    //init jg_alerts
    if (window.jg_js[JG_ALERTS_KEY]){
        try{
            __init_jg_alerts(e)
        } catch (error) {
            console.error("Error initializing JG Alerts:", error);
        }
    }
})