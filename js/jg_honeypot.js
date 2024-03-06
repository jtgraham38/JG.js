//generate diversion string


//define constants
const JG_HONEYPOT_DIVERTER_STRING = generate_random_string(12) //string to append to the front of inputs to divert bots from detecting honeypots
const JG_HONEYPOT_CLASSNAME = "jg_honeypot"                    //classname to hide honeypot inputs
const JG_HONEYPOT_FORM_CLASSNAME = "jg_honeypot_form"          //classname applied to forms honeypot inputs should be added to
const JG_HONEYPOT_GOOD_INPUT_MARKER = "jg_honeypot_good_input" //class automatically applied to inputs that were renamed so we know to reset their names on form submit
const JG_HONEYPOT_STATUS_INPUT = "jg_honeypot_failed"             //name of the input added automatically that tells whether a honeypot input was filled out, check this on your server!

const JG_HONEYPOT_STYLE = `
.${JG_HONEYPOT_CLASSNAME} {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
    width: 0;
    z-index: -1;
}
`   //styling to hide the honeypot input

//animation used by the default loader

//call functions
document.addEventListener('DOMContentLoaded', (e)=>{
    //add spin animation style to the document
    let honeypot_style = document.createElement('style')
    honeypot_style.innerText = JG_HONEYPOT_STYLE
    document.head.appendChild(honeypot_style)

    //add honeypot inputs
    jg_add_honeypots()
})

/*
This function adds honeypot inputs to all forms with the classname in JG_HONEYPOT_FORM_CLASSNAME.
It adjusts the names of all real inputs to distract bots from them, then it creates new honeypot inputs with those names
in the form.  When the form is submitted, it adds a field to indicate whether the honeypot check failed, called the string
in JG_HONEYPOT_STATUS_INPUT, then removes all the honeypot inputs and submits the form.
*/
function jg_add_honeypots(){
    //get forms
    let forms = Array.from(document.querySelectorAll("." + JG_HONEYPOT_FORM_CLASSNAME))

    //for each form...
    forms.map((form)=>{
        //get all inputs of type text or email and
        let inputs = Array.from(form.querySelectorAll('input[type="email"], input[type="text"]'))
        inputs.map((input)=>{
            //add honeypot input copies of them
            let hp_input = document.createElement('input')
            hp_input.type = input.type
            hp_input.autocomplete = "off"
            hp_input.name = input.name
            hp_input.classList.add(JG_HONEYPOT_CLASSNAME)
            form.appendChild(hp_input)

            //change their names with a string
            input.name = JG_HONEYPOT_DIVERTER_STRING + input.name
            input.classList.add(JG_HONEYPOT_GOOD_INPUT_MARKER)

        })

        //add one extra honeypot text field for good measure (in case there are no text or email inputs)
        let honeypot = document.createElement('input')
        honeypot.type = "text"
        honeypot.autocomplete = "off"
        honeypot.name = "jg_honeypot"
        honeypot.classList.add(JG_HONEYPOT_CLASSNAME)
        form.appendChild(honeypot)

        //add onsubmit event listener to form to...
        form.addEventListener('submit', (event)=>{
            event.preventDefault()

            //get formdata to submit
            let form_data = new FormData(event.target)
            form_data.set("blah", "blegh")
            
            let honeypot_failed = false //whether the honeypot check failed
            let inputs = Array.from(form.querySelectorAll('input[type="email"], input[type="text"]'))
            inputs.map((input)=>{   //inputs is fromt the beginning of this function
                //check and remove honeypot inputs
                if (input.classList.contains(JG_HONEYPOT_CLASSNAME)){
                    if (input.value != "") honeypot_failed = true
                    input.remove()
                }
                //return names of old inputs to their originals
                else{
                    if (input.classList.contains(JG_HONEYPOT_GOOD_INPUT_MARKER)){
                        input.name = input.name.substring(JG_HONEYPOT_DIVERTER_STRING.length)   //return input name to its original value
                    }
                }
            })

            //check default honeypot input
            if (honeypot.classList.contains(JG_HONEYPOT_CLASSNAME)){    //"honeypot" is defined earlier in the function
                if (honeypot.value != "") honeypot_failed = true
                honeypot.remove()
            }
            
            //add input for whether the the honeypot check failed
            let hp_failed_input = document.createElement('input')
            hp_failed_input.type = 'hidden'
            hp_failed_input.name = JG_HONEYPOT_STATUS_INPUT
            form.appendChild(hp_failed_input)
            if (honeypot_failed){
                hp_failed_input.value = true
            }else{
                hp_failed_input.value = false
            }

            const form_obj = {};
            form_data.forEach((value, key) => {
                form_obj[key] = value;
            });
            console.log(form_obj)

            form.submit()
        })
    })
}

function generate_random_string(length) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let random_string = '';
    
    for (let i = 0; i < length; i++) {
      const random_index = Math.floor(Math.random() * alphabet.length);
      random_string += alphabet.charAt(random_index);
    }
    
    return random_string;
  }