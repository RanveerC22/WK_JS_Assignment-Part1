const Dispatcher = {
    callbacks:[],

    register(callback){  //function=> handelaction will be passed with current loadstructure 
        this.callbacks.push(callback)
    },

    dispatch(action){
        this.callbacks.forEach(callback=>callback(action));
    }
}


const Storage = {
    root_state:[{
        name:"Root Folder",
        id: "root-section",
        type:"folder",
        level:0,
        children:[]
    },

],

    getState(){
        return this.root_state;
    },

    handelAction(action){
       if(action.type === 'NEWFILE'){
        parent_push(Storage.root_state, action.newfile, action.parentid);
        
       }
       
       if(action.type=='NEWFOLDER'){
        parent_push(Storage.root_state, action.newfolder, action.parentid);
       }

       if(action.type == 'DELETE'){
        let elementID = action.id;
        let parentId=findParentNode(Storage.root_state,elementID);
        console.log("THis is parent",parentId)
        if(action.id=="root-section"){
        window.alert("Root Cannot be deleted");
        }else{
            deleteNode(action.parentId , Storage.root_state , action.id )
        }

       }

       if(action.type=='OPEN_ClOSE'){
        let lastchildren = action.node.parentNode.lastElementChild;
        
        if(lastchildren.classList.length == 0){
            lastchildren.classList.add("collapse");
            action.node.classList.remove("rotate");
            action.node.classList.add("normal");
        }else{
            lastchildren.classList.remove("collapse");
            action.node.classList.add("rotate");
            action.node.classList.remove("normal");
        }
       }

    }

}

const View = {
    render(){
        this.mainsection = document.getElementById("root-section");
        this.mainsection.innerHTML = '';
        const storage = Storage.getState();
        adding_in_html(this.mainsection,storage);
    }
}

View.render();

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

    let temp=document.createElement("div");
    temp.id=idgenerator();
    new_div.appendChild(temp);
    return new_div;
}

function createFile(name, object){
 let new_div = document.createElement("div");
 new_div.id=  idgenerator();
 new_div.style.paddingLeft =((object.level) * 10) + "px"; 
 new_div.innerHTML = name;
 let{delete_button} = creating_buttons();
 new_div.appendChild(delete_button);
 let temp=document.createElement("div");
 temp.id=idgenerator();
 new_div.appendChild(temp);
return new_div;
}

function creating_arrow() {
    let arrow = document.createElement("span");
    arrow.classList.add("rotate")
    arrow.setAttribute("onclick", "createexpcollistner(this)")
    arrow.innerHTML = "&#9205;"
    return arrow;
}

function creating_buttons() {
    let folder_button = document.createElement("button");
    folder_button.innerHTML = "&#128448;";
    folder_button.classList.add("icons")
    folder_button.setAttribute("onclick", "createfoldereventlistner(this)")

    let file_button = document.createElement("button")
    file_button.innerHTML = "&#128196;"
    file_button.classList.add("icons")
    file_button.setAttribute("onclick", "createfileeventlistner(this)")

    let delete_button = document.createElement("button")
    delete_button.innerHTML = " &#x2715;"
    delete_button.classList.add("icons")
    delete_button.setAttribute("onclick", "createdeleteeventlistner(this)")

    return { folder_button, file_button, delete_button };
}
const deleteNode = (id, store , deleteId) => {
    console.log(store);
    console.log(id);
    let parentObjs = findItem(store, id);
    let siblings = parentObjs.children;
    for(let i=0; i<siblings.length; i++){
        if(siblings[i].id == deleteId){
            siblings.splice(i, 1);
        }
    }
}






Dispatcher.register(Storage.handelAction.bind(Storage));