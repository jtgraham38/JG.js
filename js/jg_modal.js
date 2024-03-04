//define constants
const JG_DIALOG_CLASSNAME = "jg_modal"                 //classname for dialogs that should be affected by this script
const JG_CLOSE_CONTENT_ID = "jg_close_btn_content"         //id for the template used to define the content of the close button
const JG_CLOSE_BTN_CLASSNAME = "jg_modal_close_btn"        //classname for the close button generated in the modal
const JG_OPEN_BUTTON_ATTRNAME = "jg_open"    //attribute name that holds the id of the dialog to open 
const JG_MODAL_STYLE = `
.${JG_CLOSE_BTN_CLASSNAME} {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 0.25rem;
    margin-right: 0.25rem;
    border: none;
    background: none;
    margin-bottom: 0;
    margin-left: 0;
    font-size: large;
}

`   // style applied to the default modal close button

//call functions
document.addEventListener('DOMContentLoaded', (e)=>{
    //add spin animation style to the document
    let modal_style = document.createElement('style')
    modal_style.innerText = JG_MODAL_STYLE
    document.head.appendChild(modal_style)
    //add close buttons and open triggers
    jg_add_modal_close_button()
    jg_make_elements_trigger_open()
})

/* 
This function adds a close button to all modals on the page with the CLOSE_CLASSNAME class.
The default style creates an x button using the html time character.  To modify the close button content, define a template with the id JG_CLOSE_CONTENT_ID.
The close button can be styled by targeting the JG_CLOSE_BTN_CLASSNAME class in css.
*/
function jg_add_modal_close_button(){
    //get all modals with jg_close class
    let modals = Array.from(document.querySelectorAll('dialog.' + JG_DIALOG_CLASSNAME))

    //create close button in each button
    modals.map((modal)=>{

        //create close button
        let btn = document.createElement('button')
        btn.classList.add(JG_CLOSE_BTN_CLASSNAME)
        
        //add button content
        let template = document.getElementById(JG_CLOSE_CONTENT_ID)
        if (template){
            let btn_content = document.importNode(template.content, true)
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
    //get buttons with the JG_OPEN_BUTTON_ATTRNAME attribute
    let btns = Array.from(document.querySelectorAll('button[' + JG_OPEN_BUTTON_ATTRNAME + ']'))

    btns.map((btn)=>{

        //get dialog from id name
        let modal = document.getElementById(btn.getAttribute("jg_open"))

        //if dialog exists, add open functionality
        if (modal){
            btn.addEventListener('click', (event)=>{
                if (modal.tagName === 'DIALOG' && modal.classList.contains(JG_DIALOG_CLASSNAME))
                modal.showModal()
            })
        }

    })
}
