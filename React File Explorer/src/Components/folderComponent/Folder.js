import { useContext, useEffect } from "react"
import { RootState } from "../rootComponent"
import "../folderComponent/Folder.css"


export const Folder = (props) =>{
    const {root, UpdateRoot} = useContext(RootState)
    console.log({root})
    
    function PushingParent(DummyRoot,newFObject){
       
        return (
            <div>
               {DummyRoot.map(eachroot=>{
            if(eachroot.id === newFObject.parentNodeid){
                root.children.push(newFObject)
            }else if(DummyRoot.children !==null){
                return PushingParent(DummyRoot.children, newFObject);
            }
           })}
            </div>
        )
    }

    function NewFolderObj() {
        const newObj= {
             id: props.parentID+1,
             level: props.level+1,
             parentNodeid: props.parendnodeID+1,
             name: props.inputName,
             type: "folder",
             children: [],
        }
        console.log(newObj);
        let DummyRoot = root;
        PushingParent(DummyRoot,newObj);
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