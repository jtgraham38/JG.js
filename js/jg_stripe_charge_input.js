//must include stripe for this scirpt to work: <script src="https://js.stripe.com/v3/"></script>
const CARD_INPUT_CONTAINER_ID = "jg_stripe_card_container"
const STRIPE_PUBLIC_KEY_VARNAME = "jg_stripe_public_key"


//call functions
document.addEventListener('DOMContentLoaded', (e)=>{
    //add card inputs
    jg_create_stripe_card_input()
})

function jg_create_stripe_card_input(){
    //create stripe inputs
    const stripe = Stripe(window[STRIPE_PUBLIC_KEY_VARNAME])
    
    const elements = stripe.elements();
    const card_element = elements.create('card');
    
    card_element.mount('#' + CARD_INPUT_CONTAINER_ID);

    //TODO: get elements using passed in ids
    const card_holder_name = document.getElementById('card_holder_name');
    const payment_form = document.getElementById('checkout_form')
    

    //submit the payment form
    payment_form.addEventListener('submit', async (event) => {
        //prevent default form submission
        event.preventDefault()

        //get payment method from stripe
        const { payment_method, error } = await stripe.createPaymentMethod(
            'card', card_element, {
                billing_details: { name: card_holder_name.value }
            }
        );
    
        //respond based on success of stripe api call
        if (error) {
            //display "error.message" to the user...
            console.log(error.message)
        } else {
            //the card has been verified successfully...
            console.log("verification success")
            console.log(payment_method)
            document.getElementById('payment_method_id_input').value = payment_method.id
        }

        //submit the form
        event.target.submit()
    });
}

