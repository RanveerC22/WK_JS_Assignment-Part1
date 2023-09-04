import { useContext, useEffect } from "react"
import { RootState } from "../rootComponent"
import { v4 as uuidv4 } from 'uuid';
import "../folderComponent/Folder.css"

let count =0;

function generateID(){
    count++
    return count
}

export const Folder = (props) =>{
    const {root, UpdateRoot} = useContext(RootState)
    
    // function generateUniqueId() {
    //     const uniqueId = uuidv4();
    //     return uniqueId;
    // }

    // const uniqueIDD = generateUniqueId();
    

    function PushingParent(root,newFObject){
               {root.map(eachroot=>{        
            if(eachroot.id === newFObject.parentNodeid){
                let flag=0;
                {eachroot.children.map(node=>{
                    if(node.name==newFObject.name){
                        window.alert("File/Folder with this name already Exist")
                        flag=1;
                    }
                })}
                if(flag==1){
                    return;
                }
                eachroot.children.push(newFObject)
            }else if(eachroot.children !==null){
                PushingParent(eachroot.children, newFObject);
            }
           })}      
    }

    function NewFolderObj() {
        console.log("Id",props.parentID)
        console.log("Parent ID",props.parendnodeID)
        const newObj= {
             id: generateID(),
             level: props.level+1,
             parentNodeid: props.parentID,
             name: props.inputName,
             type: "folder",
             children: [],
        }
        
        PushingParent(root,newObj);
        UpdateRoot([...root])
       console.log("The new obj", newObj)
        console.log("The root",root)
    }

    function NewFileObj() {
        console.log("Id",props.parentID)
        console.log("Parent ID",props.parendnodeID)
        const newObj= {
             id: generateID(),
             level: props.level+1,
             parentNodeid: props.parentID,
             name: props.inputName,
             type: "file",
             children: null,
        }
        
        PushingParent(root,newObj);
        UpdateRoot([...root])
        console.log("New Object",newObj)
        console.log(root)
    }

    function deleteItem(root){
        console.log(root)
        if(props.parentID==0){
            window.alert("Root cannot be deleted");
            return;
        }
        console.log("Delete Item", props.parentID, props.parendnodeID)
        {
            root.map(node=>{
                if(node.id==props.parendnodeID){
                    {
                        let i=0;
                        node.children.map(child=>{
                            if(child.id==props.parentID){
                                node.children.splice(i,1)
                                return;
                            }
                            i++;
                        })
                    }
                }

                else if(node.children!=null){
                    deleteItem(node.children)
                }
            })
        }
        UpdateRoot([...root])

    }
    return (
        <div className="folderclass">
            <span>{props.FFname}</span>
            {props.inputName? (
            <span>
            <span className="createFolderBtn" onClick={NewFolderObj}>&#128193;</span>
            <span className="createFileBtn" onClick={NewFileObj}>&#128196;</span>
          </span>
        ): (
            ""
        )}
          <span className="deleteBtn" onClick={()=>{
            deleteItem(root)
          }}>❌</span>
        </div>
        
    )
}