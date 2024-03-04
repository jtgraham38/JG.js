//define constants
const JG_LOADER_CLASSNAME = "jg_loader"                    //classname of outermost container of the loader content
const JG_LOADER_DEFAULT_CLASSNAME = "jg_loader_default"    //classname applied to the outermost container of jg loaders when no customization of the content is added
const JG_LOADER_CONTENT_ID = "jg_loader_content"           //id for the template defining the content of jg loaders.
const JG_LOADER_DEFAULT_STYLE = `
.${JG_LOADER_CLASSNAME}.${JG_LOADER_DEFAULT_CLASSNAME} {
    border: 4px solid lightslategray;
    border-top: 4px solid darkslategray;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    animation: jg_loader_spin 1s linear infinite;
}

@keyframes jg_loader_spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`

//animation used by the default loader

//call functions
document.addEventListener('DOMContentLoaded', (e)=>{
    //add spin animation style to the document
    let spin_style = document.createElement('style')
    spin_style.innerText = JG_LOADER_DEFAULT_STYLE
    document.head.appendChild(spin_style)
})


/*
This function gets a loader that can be added to any element on the screen.
It creates it from the template
*/
function jg_get_loader(){
    //create loader
    let loader = document.createElement('div')
    loader.classList.add(JG_LOADER_CLASSNAME)

    //get content for loader
    let template = document.getElementById(JG_LOADER_CONTENT_ID)
    if (template){
        let loader_content = document.importNode(template.content, true)
        loader.appendChild(loader_content)
    }
    else{
        loader.classList.add(JG_LOADER_DEFAULT_CLASSNAME)
    }

    //return it
    return loader
}

/*

*/
async function jg_async_loader_task(event){

}