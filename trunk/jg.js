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


    //init jg_honeypot
    if (window.jg_js[JG_HONEYPOT_KEY]){
        console.log("init jg_honeypot")
        try{
            __init_jg_honeypot(e)
        } catch (error) {
            console.error("Error initializing JG Honeypots:", error);
        }
    }
    //init jg_stripe_charge_input
    if (window.jg_js[JG_STRIPE_CHARGE_INPUT_KEY]){
        console.log("init jg_stripe_charge_input")
        try{
            __init_jg_stripe_charge_input(e)
        } catch (error) {
            console.error("Error initializing JG Stripe Charge Inputs:", error);
        }
    }
    //init jg_ajax_form
    if (window.jg_js[JG_AJAX_FORM_KEY]){
        console.log("init jg_ajax_form")
        try{
            __init_jg_ajax_form(e)
        } catch (error) {
            console.error("Error initializing JG Ajax Forms:", error);
        }
    }
    //init jg_modal
    if (window.jg_js[JG_MODAL_KEY]){
        console.log("init jg_modal")
        try {
            __init_jg_modal(e);
        } catch (error) {
            console.error("Error initializing JG Modals:", error);
        }
    }
    //init jg_laoder
    if (window.jg_js[JG_LOADER_KEY]){
        console.log("init jg_loader")
        try{
            __init_jg_loader(e)
        } catch (error) {
            console.error("Error initializing JG Loaders:", error);
        }
    }
    //init jg_alerts
    if (window.jg_js[JG_ALERTS_KEY]){
        console.log("init jg_alerts")
        try{
            __init_jg_alerts(e)
        } catch (error) {
            console.error("Error initializing JG Alerts:", error);
        }
    }
})