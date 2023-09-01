import { useContext, useState } from "react"
import { SearchBar } from "../SerachBar/searchBar";
import { RootState } from "../rootComponent";
import { Folder } from "../folderComponent/Folder";

export const TypeChecker = () =>{

    const [inputName, SetinputName] = useState("");
    //console.log({inputName})

    const {root, UpdateRoot} = useContext(RootState)
    return (
        <div>
           <SearchBar setname= {SetinputName}></SearchBar>
           {root.map(eachroot =>{
            if(eachroot.type === "folder"){
              return  <Folder inputName = {inputName} FFname = {eachroot.name} parentID = {eachroot.id} level={eachroot.level} parendnodeID ={eachroot.parentNodeid}/>
            }
           })}
        </div>
    )
}