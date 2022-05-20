import React,{useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import  Notes  from './Notes'

const Home = () => {
    const hist = useHistory();
    useEffect(() => {
        if(!localStorage.getItem('token'))
        {
            hist.push('/login');
            alert('please login first');
        }
    }, [])
    return (
       <>
            <Notes />
        </>
    )
}

export default Home
