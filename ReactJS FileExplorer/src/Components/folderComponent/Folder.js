import { useContext, useEffect } from "react"
import { RootState } from "../rootComponent"
import "../folderComponent/Folder.css"


export const Folder = (props) =>{
    const {root, UpdateRoot} = useContext(RootState)
    function PushingParent(root,newFObject){
               {root.map(eachroot=>{
            if(eachroot.id === newFObject.parentNodeid){
                eachroot.children.push(newFObject)
            }else if(eachroot.children !==null){
                PushingParent(eachroot.children, newFObject);
            }
           })}      
    }

    function NewFolderObj() {
        console.log(root)
        console.log(props.parendnodeID)
        const newObj= {
             id: props.parentID+1,
             level: props.level+1,
             parentNodeid: props.parendnodeID+1,
             name: props.inputName,
             type: "folder",
             children: [],
        }
        
        PushingParent(root,newObj);
        UpdateRoot([...root])
        console.log(root)
    }

    return (
        <div className="folderclass">
            <span>{props.FFname}</span>
            {props.inputName? (
            <span>
            <span className="createFolderBtn" onClick={NewFolderObj}>&#128193;</span>
            <span className="createFileBtn">&#128196;</span>
          </span>
        ): (
            ""
        )}
          <span className="deleteBtn">❌</span>
        </div>
    )
}