import { useContext, useEffect } from "react"
import { RootState } from "../rootComponent"
import { v4 as uuidv4 } from 'uuid';
import "../folderComponent/Folder.css"
import { Folder } from "../folderComponent/Folder";
let count =0;

function generateID(){
    count++
    return count
}

export const File = (props) =>{
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
          <span className="deleteBtn" onClick={()=>{
            deleteItem(root)
          }}>❌</span>

          </span>
        ): (
            ""
        )}
        </div>
        
    )
}