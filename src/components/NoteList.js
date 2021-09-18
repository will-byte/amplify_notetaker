import React, { useContext, useEffect } from 'react';
import '@aws-amplify/ui/dist/style.css';
import { Context as NoteContext } from '../context/NoteContext';

const NoteList  = ({ editModeON }) => {
    const { state, deleteMyNote } = useContext(NoteContext);
    
    return(
        <div>
            {state.map(({ id, note }) => (
                <div key={id} className="flex items-center">
                    <li 
                        className="list pa1 f3"
                        onClick={() => editModeON(id, note, true)}
                    > {note} </li>

                    <button 
                        className="bg-transparent bn f4"
                        onClick={() => deleteMyNote(id)}>
                        <span>&times;</span>
                    </button>
                </div>
            ))}
        </div>
    );
}

export default NoteList; 

{/* tute for this implementation: 
    https://www.youtube.com/watch?v=35lXWvCuM8o
*/}