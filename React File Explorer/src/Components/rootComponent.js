import {createContext, useState} from 'react'
import { TypeChecker } from './TypeChecker/typeChecker';

export const RootState = createContext();
export const RootComponent = () =>{

const [root, UpdateRoot] = useState([
    {
        id: 0,
        level: 0,
        parentNodeid: -1,
        name: "root",
        type: "folder",
        children: {},
    }
])
    return (
        <div>
            <RootState.Provider value={{root, UpdateRoot}}>
                <h1>Hello Bro</h1>
                <TypeChecker/>
            </RootState.Provider>
            
        </div>
    )
}