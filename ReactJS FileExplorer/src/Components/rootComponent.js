import {createContext, useEffect, useState} from 'react'
import { TypeChecker } from './TypeChecker/typeChecker';
import { SearchBar } from './SerachBar/searchBar';
import { v4 as uuidv4 } from 'uuid';

export const RootState = createContext();



export const RootComponent = () =>{

    const [inputName, SetinputName] = useState("");
    
    
    // function generateUniqueId() {
    //     const uniqueId = uuidv4();
    //     return uniqueId;
    // }
     
    

const [root, UpdateRoot] = useState([
    {
        id: 0,
        level: 0,
        parentNodeid: -1,
        name: "root",
        type: "folder",
        children: [],
    }
])

    return (
        <div>
            <RootState.Provider value={{root, UpdateRoot}}>
            <SearchBar setname= {SetinputName}></SearchBar>
                <TypeChecker root={root} inputName = {inputName}/>
            </RootState.Provider>
            
        </div>
    )
}