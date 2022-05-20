import React, { useEffect, useState, useRef} from 'react'
import Notesitem from './Notesitem';


const Notes = () => {

    const [notes, setNotes] = useState([]);
    const [data, setData] = useState({});
    const [edata, setEData] = useState({});
    const btn = useRef(null);
    useEffect(() => {
        async function fetchData() {
            const a = await fetch('http://localhost:5000/api/notes/fetchNotes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            }
            );
            const b = await a.json();
            setNotes(b);
        }
        fetchData();
    }, []);

    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
    }
    const handerEChange= (e) => {
        setEData({ ...edata, [e.target.id]: e.target.value });
    }

    const editNote = async (id,title,description,tag)=>{
        btn.current.click();
        setEData({eid:id, etag:tag, etitle:title, edescription:description});
        // document.getElementById('etitle').value = title;
        // document.getElementById('edescription').value = description;
        // document.getElementById('etag').value = tag;
    }

    const updateNote= async (e)=>{
        e.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title:edata.etitle, description:edata.edescription, tag:edata.etag})
        };
       await fetch(`http://localhost:5000/api/notes/updateNote/${edata.eid}`, requestOptions);
       const newNote = JSON.parse(JSON.stringify(notes));
       for(var index = 0; index < notes.length; index = index+1)
        {
            console.log(index);
            if(newNote[index]._id === edata.eid)
            {
                 newNote[index].title = edata.etitle;
                 newNote[index].description = edata.edescription;
                 newNote[index].tag = edata.etag;
                 console.log(newNote)
            }
        }
        console.log(newNote, notes);
        setNotes(newNote);
        btn.current.click();

    }

    const addNote = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        };
        console.log(localStorage)
        const a = await fetch('http://localhost:5000/api/notes/addNote', requestOptions);
        const b = await a.json();
        setNotes(notes.concat(b));
    }

    const deleteNote = async (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        };
        await fetch(`http://localhost:5000/api/notes/deleteNote/${id}`, requestOptions);
        setNotes(notes.filter((note) => {
            return note._id !== id;
        }))
    }

    return (
        <>

        {/* COMPONENT FOR ADDING A NOTE */}


            <div className="container mt-5">
                <form>
                    <div className="row">
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleInputEmail1" className="form-label">Add Title</label>
                            <input type="text" className="form-control" id="title" onChange={handleChange} />
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleInputEmail1" className="form-label">Add Tag</label>
                            <input type="text" className="form-control" id="tag" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Add Description</label>
                        <input type="text" className="form-control" id="description" onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={addNote}>Submit</button>
                </form>
                <div className="row my-4">


        {/* FOR NOTEITEMS */}


                    {notes?notes.map((notes) => {
                        return <Notesitem key={notes._id} tag={notes.tag} id={notes._id} title={notes.title} description={notes.description} deleteNote={deleteNote} editNote={editNote}/>;
                    }):"Add a note"}
                </div>
            </div>


        {/* MODAL FOR EDIT NOTE */}


<button ref={btn} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
</button>

<div className='modal fade' id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" value={edata.etitle || 'none'}  onChange={handerEChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" value={edata.etag || 'none'} onChange={handerEChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" value={edata.edescription||'none'} onChange={handerEChange}/>
  </div>
</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={updateNote}>Save Note</button>
      </div>
    </div>
  </div>
</div>
        </>
    )
}
export default Notes;
