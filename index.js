const deleteClick = (event) => {
    console.log("Delete clicked");
    let mainId = event.parentNode.parentNode.id;
    deleteNode(mainId, loadstruture, event.parentNode.id)
    let new_div = document.getElementById("sub");
    new_div.innerHTML = '';
    parentid = 0;
    adding_in_html(new_div, loadstruture[0].children)
}

const deleteNode = (id, childrenArray, deleteId) => {
    if (id === "sub") {
        id = "root-section"
    }

    for (let i = 0; i < childrenArray.length; i++) {
        if (id === childrenArray[i].id) {
            let childArray = childrenArray[i].children;

            let index = childArray.findIndex((obj) => obj.id === deleteId);
            childrenArray[i].children.splice(index, 1);
            return;
        }
        if (childrenArray[i].children != null) {
            deleteNode(id, childrenArray[i].children, deleteId);  // Recursively search nested children
        }
    }

}