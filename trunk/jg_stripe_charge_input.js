//mark for initialization
window.jg_js[window.JG_STRIPE_CHARGE_INPUT_KEY] = true

//must include stripe for this scirpt to work: <script src="https://js.stripe.com/v3/"></script>
const JG_CARD_INPUT_CONTAINER_ID = "jg_stripe_card_container"
const JG_STRIPE_PUBLIC_KEY_VARNAME = "jg_stripe_public_key"
const JG_PAYMENT_FORM_ID = "jg_checkout_form"
const JG_CARDHOLDER_NAME_INPUT_ID = "jg_card_holder_name_input"
const JG_PAYMENT_METHOD_ID_INPUT_ID = "jg_payment_method_id_input"


//this init function is called in jg.js, do not call it directly!
function __init_jg_stripe_charge_input(e){
    //add card inputs
    jg_create_stripe_card_input()
}

function jg_create_stripe_card_input(){
    //create stripe inputs
    const stripe = Stripe(window[JG_STRIPE_PUBLIC_KEY_VARNAME])
    
    const elements = stripe.elements();
    const card_element = elements.create('card');
    
    card_element.mount('#' + JG_CARD_INPUT_CONTAINER_ID);

    //get elements using passed in ids
    const payment_form = document.getElementById(JG_PAYMENT_FORM_ID)
    const card_holder_name = document.getElementById(JG_CARDHOLDER_NAME_INPUT_ID);
    

    //add payment method id hidden input
    const pmid_input = document.createElement('input')
    pmid_input.type = 'hidden'
    pmid_input.name = 'payment_method_id'
    pmid_input.id = JG_PAYMENT_METHOD_ID_INPUT_ID
    payment_form.appendChild(pmid_input)
    

    //submit the payment form
    payment_form.addEventListener('submit', async (event) => {
        //prevent default form submission
        event.preventDefault()

        //get payment method from stripe
        const response = await stripe.createPaymentMethod(
            'card', card_element, {
                billing_details: { name: card_holder_name.value }
            }
        );
        payment_method = response.paymentMethod
        error = response.error

        //respond based on success of stripe api call
        if (error) {
            //display "error.message" to the user...
            console.log(error.message)
        } else {
            //the card has been verified successfully...
            console.log("verification success")
            console.log(payment_method)
            document.getElementById(JG_PAYMENT_METHOD_ID_INPUT_ID).value = payment_method.id
        }

        //submit the form
        event.target.submit()
    });
}

