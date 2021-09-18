import React, { useContext, useEffect, useState } from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import { Context as NoteContext } from './context/NoteContext';

import '@aws-amplify/ui/dist/style.css';


const App = () => {
  const { addTestNote, getNotesList } = useContext(NoteContext);
  const [editNote, setEditNote] = useState('');

  
  useEffect(() => {
    getNotesList();
  }, []);

  return (
    <div className="flex flex-column items-center justify-center pa3 bg-washed-red">
      <AmplifySignOut/>
      <h1 className="code f2-l">Amplify Notetaker</h1>
      
      {/* Note Form */}
      <NoteForm editModeStatus={editNote} />

      {/* Note List */}
      <NoteList editModeON={(id, note, status) => setEditNote({id, note, status})}/>
    </div>
  )
};

export default withAuthenticator(App) 
