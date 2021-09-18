import React, { useState, useContext, useEffect } from 'react';
import '@aws-amplify/ui/dist/style.css';
import { Context as NoteContext } from '../context/NoteContext';

const NoteForm = ({ editModeStatus }) => { 
    const { addNewNote, editNote } = useContext(NoteContext); 
    const [note, setNote] = useState(''); 
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        console.log(editModeStatus);
        setNote(editModeStatus.note);
        setVisible(editModeStatus.status);
    },[editModeStatus]);

    return (
        <div className="mb3">
            <input 
                type="text" className="pa2 f4" placeholder="Write your note"
                value={note}
                onChange={(newContent) => setNote(newContent.target.value)}
            />

            { !visible ? <button 
                className="pa2 f4"
                onClick ={() => {
                    addNewNote(note);
                    setNote('');
                }} 
            > Add Note </button> : null }

            { visible ? <button 
                className="pa2 f4"
                onClick ={() => {
                    editNote(editModeStatus.id, note);
                    setNote('');
                    setVisible(false);
                }} 
            > Update Note </button> : null } 
        </div>
        // got the buttons showing and hiding working using the hacky visible tenery expression. Based loosely on: 
        // https://www.youtube.com/watch?v=3wvdq_j5S1c
    );
};

export default NoteForm; 