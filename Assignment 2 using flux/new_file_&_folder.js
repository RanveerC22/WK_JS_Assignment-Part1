let start = 0;

function idgenerator(){
    return ++start;
}

function CreateNewFile(filename, filetype, parentobj){
    console.log(parentobj.level);
    const newobj = {
        id:"File"+idgenerator(),
        name:filename,
        type:filetype,
        level:(parentobj.level)+1,
        children:null
    }

    return newobj;
}


function CreateNewFolder(foldername, foldertype, parentobj){
    console.log(parentobj.level);
    const newobj = {
        id:"Folder"+idgenerator(),
        name:foldername,
        type:foldertype,
        level:(parentobj.level)+1,
        children:[]
    }

    return newobj;
}

function parent_push(state, newobj, newobj_parent_id){ 
    for(let obj of state){
        if(obj.id == newobj_parent_id){
            obj.children.push(newobj);
            console.log(state);
            return;
        }

        if(obj.type=='folder'){
            parent_push(obj.children,newobj, newobj_parent_id);
        }
    }
}
