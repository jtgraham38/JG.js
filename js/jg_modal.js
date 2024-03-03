//define constants
const DIALOG_CLASSNAME = "jg_modal"                 //classname for dialogs that should be affected by this script
const CLOSE_CONTENT_ID = "jg_close_btn_content"         //id for the template used to define the content of the close button
const CLOSE_BTN_CLASSNAME = "jg_modal_close_btn"        //classname for the close button generated in the modal
const OPEN_BUTTON_ATTRNAME = "jg_open"    //attribute name that holds the id of the dialog to open 

//call functions
document.addEventListener('DOMContentLoaded', (e)=>{
    jg_add_modal_close_button()
    jg_make_elements_trigger_open()
})

/* 
This function adds a close button to all modals on the page with the CLOSE_CLASSNAME class.
The default style creates an x button using the html time character.  To modify the close button content, define a template with the id CLOSE_CONTENT_ID.
The close button can be styled by targeting the CLOSE_BTN_CLASSNAME class in css.
*/
function jg_add_modal_close_button(){
    //get all modals with jg_close class
    let modals = Array.from(document.querySelectorAll('dialog.' + DIALOG_CLASSNAME))

    //create close button in each button
    modals.map((modal)=>{

        //create close button
        let btn = document.createElement('button')
        btn.style.position = "absolute"
        btn.style.top = "0"
        btn.style.right = "0"
        btn.style.marginTop = "0.25rem"
        btn.style.marginRight = "0.25rem"
        btn.style.border = "none"
        btn.style.background = "none"
        btn.style.marginBottom = "none"
        btn.style.marginLeft = "none"
        btn.style.fontSize = "large"
        btn.classList.add(CLOSE_BTN_CLASSNAME)
        
        //add button content
        let template = document.getElementById(CLOSE_CONTENT_ID)
        if (template){
            btn_content = document.importNode(template.content, true)
            btn.appendChild(btn_content)
        }
        else
            btn.innerHTML = '<div>&times;</div>'

        //make button close modal
        btn.addEventListener('click', (event)=>{
            modal.close()
        })

        //add button to modal
        modal.appendChild(btn)
    })
}

/*
This function automatically makes a button that should open a modal open it upon being clicked.
Set jg_open equal to the id of the dialog you want that button to open.
*/
function jg_make_elements_trigger_open(){
    //get buttons with the OPEN_BUTTON_ATTRNAME attribute
    let btns = Array.from(document.querySelectorAll('button[' + OPEN_BUTTON_ATTRNAME + ']'))

    btns.map((btn)=>{

        //get dialog from id name
        let modal = document.getElementById(btn.getAttribute("jg_open"))

        //if dialog exists, add open functionality
        if (modal){
            btn.addEventListener('click', (event)=>{
                if (modal.tagName === 'DIALOG' && modal.classList.contains(DIALOG_CLASSNAME))
                modal.showModal()
            })
        }

    })
}
