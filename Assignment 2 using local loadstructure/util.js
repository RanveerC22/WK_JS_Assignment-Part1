let start = 0;

function idgenerator(){
    return ++start;
}
function CreateNewFolder(foldername, foldertype, parentobj){

    const newobj = {
        id:"Folder"+idgenerator(),
        name:foldername,
        type:foldertype,
        level:(parentobj.level)+1,
        children:[]
    }

    return newobj;
}

function CreateNewFile(filename, filetype, parentobj){
    const newobj = {
        id:"File"+idgenerator(),
        name:filename,
        type:filetype,
        level:(parentobj.level)+1,
        children:null
    }

    return newobj;
}