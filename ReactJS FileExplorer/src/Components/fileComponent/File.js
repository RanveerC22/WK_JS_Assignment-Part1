import { useContext, useEffect } from "react"
import { RootState } from "../rootComponent"
import { v4 as uuidv4 } from 'uuid';
import "../folderComponent/Folder.css"

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


    return (
        <div className="folderclass">
            <span>{props.FFname}</span>
            {props.inputName? (
            <span>
          <span className="deleteBtn">❌</span>

          </span>
        ): (
            ""
        )}
        </div>
        
    )
}