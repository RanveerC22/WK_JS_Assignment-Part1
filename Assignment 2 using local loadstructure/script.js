
// Impure function
const adding_in_html = (section,child) => {

    for (let obj of child) {
        let addingdiv
        if (obj.type === "file") {
            addingdiv = createFile(obj.name, obj);
        }
        else {
            addingdiv = createFolder(obj.name, obj);
        }
        section.appendChild(addingdiv);
        if (obj.children != null) {
            adding_in_html(addingdiv, obj.children)
        }
    }
}

function createFolder(name,object){
    let new_div = document.createElement("div");
    new_div.id = object.id;
    new_div.style.paddingLeft = ((object.level) * 15) + "px";

    let arrow_button = creating_arrow();
    let { folder_button, file_button, delete_button } = creating_buttons();

    let folder_name = document.createElement("span");
    folder_name.innerText = name;
   
    new_div.appendChild(arrow_button);
    new_div.appendChild(folder_name)
    new_div.appendChild(folder_button);
    new_div.appendChild(file_button);
    new_div.appendChild(delete_button);

    return new_div;
}

function createFile(name, object){
 const new_div = document.createElement("div");
 new_div.id=  idgenerator();
 new_div.style.paddingLeft =((object.level) * 10) + "px"; 
 new_div.innerHTML = name;
 let{delete_button} = creating_buttons();
 new_div.appendChild(delete_button);
return new_div;
}

function creating_arrow() {
    let arrow = document.createElement("span");
    arrow.classList.add("rotate")
    arrow.setAttribute("onclick", "checkClassCollapse(this)")
    arrow.innerHTML = "&#9205;"
    return arrow;
}

function creating_buttons() {
    let folder_button = document.createElement("button");
    folder_button.innerHTML = "&#128448;";
    folder_button.classList.add("icons")
    folder_button.setAttribute("onclick", "folderClick(this)")

    let file_button = document.createElement("button")
    file_button.innerHTML = "&#128196;"
    file_button.classList.add("icons")
    file_button.setAttribute("onclick", "fileClick(this)")

    let delete_button = document.createElement("button")
    delete_button.innerHTML = " &#x2715;"
    delete_button.classList.add("icons")
    delete_button.setAttribute("onclick", "deleteClick(this)")

    return { folder_button, file_button, delete_button };
}