function create_file(event){
    const user_ip = document.getElementById("user_ip");
    const parentObj = findItem(Storage.root_state,event.parentNode.id);
    
    parentid = parentObj.id;

   childs_of_Parentobj = parentObj.children;

   for(let childs of  childs_of_Parentobj){
       if(childs.name === user_ip.value){
           window.alert("The file with this name already exist");
           return;
       }
   }

   const newfile = CreateNewFile(user_ip.value,"file",parentObj);
   console.log(newfile);
   return {
    type: 'NEWFILE',
    parentid,
    newfile
   }
}

function createfileeventlistner(element){
    Dispatcher.dispatch(create_file(element));
    View.render();
}

function create_folder(event){
    const user_ip = document.getElementById("user_ip");
    const parentObj = findItem(Storage.root_state,event.parentNode.id);
    
    parentid = parentObj.id;

   childs_of_Parentobj = parentObj.children;

   for(let childs of  childs_of_Parentobj){
       if(childs.name === user_ip.value){
           window.alert("The file with this name already exist");
           return;
       }
   }

   const newfolder = CreateNewFolder(user_ip.value,"folder",parentObj);
   console.log(newfolder);

   return {
    type:'NEWFOLDER',
    parentid,
    newfolder
   }

}

function createfoldereventlistner(event){
    Dispatcher.dispatch(create_folder(event));
    View.render();
}


function findItem (folderList, index){
    let ans;
    for (let item of folderList) {
        if (item.id == index) {
            console.log(item)
            return item;
        }
        if (item.type == "folder") {
            ans = findItem(item.children, index);
            if(ans){
                return ans;
            }    
    }
    }
    return null;
}

function findParentNode(data, childId) {
    for (const node of data) {
        if (node.id === childId) {
            return node;
        }
        
        if(node.childId!=null){
            const foundInChild = findParentNode(node.children, childId);
            if (foundInChild) {
                return node;
            }
        }
       
    }
    
    return null;
}

function delete_elements(event){
    console.log("Hello",event.parentNode.parentNode);
return {
    type:'DELETE',
    id:event.parentNode.id,
    parentId:event.parentNode.parentNode.id
}

}

function createdeleteeventlistner(event){
    Dispatcher.dispatch(delete_elements(event));
    View.render();
}


const adding_in_html = (main_div,children) => {

    // for (let obj of child) {
    //     let addingdiv
    //     if (obj.type === "file") {
    //         addingdiv = createFile(obj.name, obj);
    //     }
    //     else {
    //         addingdiv = createFolder(obj.name, obj);
    //     }
    //     section.appendChild(addingdiv);
    //     if (obj.children != null) {
    //         adding_in_html(addingdiv.lastElementChild, obj.children)
    //     }
    // }

    for(let obj of children){
        let addingdiv
        // console.log(obj)

        if(obj.type == "file"){
            addingdiv = createFile(obj.name , obj);
        }

        else if(obj.type == "folder"){
            addingdiv = createFolder(obj.name , obj);
        }

        main_div.appendChild(addingdiv);

        if(obj.children != null  ){
            console.log("Hey last: ",addingdiv.lastElementChild)
            adding_in_html( addingdiv.lastElementChild , obj.children )
        }

    }
   
}

function checkClassCollapse(event){
    return{
        type:'OPEN_ClOSE',
        node:event
    }
}

function createexpcollistner(event){
    console.log("hi",event)

    Dispatcher.dispatch(checkClassCollapse(event))
}
