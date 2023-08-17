// function checkInputLength(input) {
//     const regex = /^[a-zA-Z0-9]{1,10}$/;
//     return regex.test(input);
// }

function parent_obj_finder(id,structure){

    for(let object of structure){
        if(object.id == id){
            return object;
        }

        if(object.children!=null){
           let parentobj=  parent_obj_finder(id, object.children);
           return parentobj;
        }
    }
}

function pushing_inside_parent(parentobj, newfolder, structure){
    for(let object of structure){
      if(object.id == parentobj.id){
        parentobj.children.push(newfolder);
      }

      if(object.children!=null){
       pushing_inside_parent(parentobj, newfolder, object.children);
      }
    }
}

function folderClick(event){
    console.log(event);
    const user_ip = document.getElementById("user_ip");
    const Parentobj = parent_obj_finder(event.parentNode.id, loadstruture)
    console.log(event.parentNode.id);
    
    console.log(Parentobj);
    childs_of_Parentobj = Parentobj.children;

    for(let childs of  childs_of_Parentobj){
        if(childs.name === user_ip.value){
            window.alert("The folder with this name already exist");
            return;
        }
    }

    const newfolder = CreateNewFolder(user_ip.value,"folder",Parentobj);
    console.log(newfolder);
 
    pushing_inside_parent(Parentobj, newfolder, loadstruture);

    const section = document.getElementById("sub");
    section.innerHTML = '';


    adding_in_html(section,loadstruture[0].children)
}

function fileClick(event) {
    const user_ip = document.getElementById("user_ip");
    const Parentobj = parent_obj_finder(event.parentNode.id, loadstruture);

    childs_of_Parentobj = Parentobj.children;

    for(let childs of  childs_of_Parentobj){
        if(childs.name === user_ip.value){
            window.alert("The file with this name already exist");
            return;
        }
    }

    const newFile = CreateNewFile(user_ip.value,"file", Parentobj);

    pushing_inside_parent(Parentobj, newFile, loadstruture);

    const section = document.getElementById("sub");
    section.innerHTML = '';


    adding_in_html(section,loadstruture[0].children);
}