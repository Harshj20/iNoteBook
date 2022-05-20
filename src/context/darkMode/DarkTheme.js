import { useState } from 'react';
import darkContext from './darkContext';

const DarkMode = (props)=>{
    const [mode, setMode] = useState('light');
    const update = ()=>{
        if(mode === 'dark'){
        setMode('light');
        document.body.style.color = 'black';
        document.body.style.background = 'white';
        }
        else{
        setMode('dark');
        document.body.style.color = 'white';
        document.body.style.background = 'black';
        }
    }

    return (
        <darkContext.Provider value={{mode, update}}>
            {props.children}
        </darkContext.Provider>
    )
}

export default DarkMode;