import { useContext, useState } from "react"
import { SearchBar } from "../SerachBar/searchBar";
import { RootState } from "../rootComponent";
import { Folder } from "../folderComponent/Folder";
import {File } from "../fileComponent/File"
export const TypeChecker = (props) =>{

 
    return (
        <div>
           {props.root.map((eachroot) =>{
            if(eachroot.type === "folder"){
                return( 
                <div style={{paddingLeft:"20px"}}> 
          
                  <Folder inputName = {props.inputName} FFname = {eachroot.name} parentID = {eachroot.id} level={eachroot.level} parendnodeID ={eachroot.parentNodeid} />
                  {eachroot.children &&
                    <TypeChecker root={eachroot.children} inputName={props.inputName} />
                  }
                </div>
                ) 
            }else{
              return( 
                <div style={{paddingLeft:"20px"}}> 
          
                  <File inputName = {props.inputName} FFname = {eachroot.name} parentID = {eachroot.id} level={eachroot.level} parendnodeID ={eachroot.parentNodeid} />
                  {eachroot.children &&
                    <TypeChecker root={eachroot.children} inputName={props.inputName} />
                  }
                </div>
                )             }
           })}
        </div>
    )
}