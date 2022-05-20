import React,{useState,} from 'react'
import { useHistory } from 'react-router-dom';

const SignIn = () => {
    const [data, setData] = useState({name:'',email:'', password:'', cpassword:''});
    const hist = useHistory();


    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
    }



    const SubmitForm= async (e)=>{
        if(data.password !== data.cpassword)
        {
            e.preventDefault();
            alert('Confirmed password does not patch');
        }
        else{
        e.preventDefault();
        const requestOptions = {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({name:data.name, email:data.email, password:data.password})
        };
        const response = await fetch('http://localhost:5000/api/auth/createUser', requestOptions);
        const a = await response.json();
        if(a.success)
        {
            // localStorage.setItem(a.authToken);
            setData({name:'',email:'', password:'', cpassword:''});
            localStorage.setItem('token', a.authToken);
            hist.push('/');
        }
        else
        {
            alert(a.error);
        }
    }
}


    return (
        <div className='container my-4'>
        <form onSubmit={SubmitForm}>
        <div className="mb-3">
<label htmlFor="name" className="form-label">Name</label>
<input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={data.name} onChange={handleChange} required/>
</div>
<div className="mb-3">
<label htmlFor="email" className="form-label">Email address</label>
<input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={data.email} onChange={handleChange} required/>
</div>
<div className="mb-3">
<label htmlFor="password" className="form-label">Password</label>
<input type="password" className="form-control" id="password" onChange={handleChange} value={data.password} minLength={5} required/>
</div>
<div className="mb-3">
<label htmlFor="cpassword" className="form-label">Confirm Password</label>
<input type="password" className="form-control" id="cpassword" aria-describedby="emailHelp" value={data.cpassword} onChange={handleChange} required/>
</div>
<button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
    )
}

export default SignIn
