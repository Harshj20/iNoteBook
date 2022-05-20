import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';

const Login = () => {

    const [data, setData] = useState({email:'', password:''});
    const hist = useHistory();
    useEffect(()=>{
        setData({email:'', password:''});
    },[])
    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
    }

    const SubmitForm= async (e)=>{
        e.preventDefault();

        const requestOptions = {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        };
        const response = await fetch('http://localhost:5000/api/auth/login', requestOptions);
        const a = await response.json();
        if(a.success)
        {
            localStorage.setItem('token',a.authToken);
            console.log(a.authToken);
            setData({email:'', password:''});
            hist.push('/');
        }
        else
        {
            alert('please enter valid credentials');
        }

    }

    return (
        <div className='container my-4'>
            <form onSubmit={SubmitForm}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={data.email} onChange={handleChange} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={handleChange} value={data.password} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
    )
}

export default Login
