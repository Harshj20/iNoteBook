import React, {useContext} from 'react'
import darkContext from '../context/darkMode/darkContext';

const Notesitem = (props) => {
    const { title,id, description, tag} = props;
    const a = useContext(darkContext);
    return (

        <div className="card col-4 mx-2 my-2" style={{ width: "18rem", backgroundColor: a.mode==='dark'?'#2e3237':'white', border:a.mode==='dark'?'white 1px solid':''}}>
            <div className="card-body">
                <h5 className="card-title" style={{minHeight:24}}>{title}</h5>
                <p className="card-text" style={{minHeight:20}}>{description}</p>
                <div className="card-footer text-muted text-center" style={{border:'none', backgroundColor:'inherit'}}>
                    {tag}
                </div>
                <i className="far fa-trash-alt" style={{cursor:"pointer"}} onClick={()=>{props.deleteNote(id);}}></i>
                <i className="fas fa-user-edit mx-3" style={{cursor:"pointer"}} onClick={()=>{props.editNote(id,title,description,tag);}}></i>
            </div>
        </div>
    )
}

export default Notesitem;
