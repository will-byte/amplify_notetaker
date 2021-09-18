import createDataContext from './createDataContext';
import { API, graphqlOperation } from 'aws-amplify';
import { createNote, deleteNote, updateNote } from '../graphql/mutations'; 
import { listNotes } from '../graphql/queries'; 
import { useEffect } from 'react'; 

const noteReducer = (state, action) => {
	switch (action.type) {

		case 'add_note':
			return [...state, action.payload]

		case 'get_notes_list':
			return action.payload;

		case 'delete_note': 
			return state.filter((notes) => notes.id !== action.payload); 

		case 'add_test_note': 
			return [...state, {id: Math.floor(Math.random() * 99999), note: `Test Note #${state.length +1}`}];

		case 'edit_note': 
			return state.map((notes) => {
				return notes.id === action.payload.id 					
					? action.payload // if the above condition is met then return the copy of entire note array with new content for THIS id with it's title and content updated with the payload
					: notes; // otherwise append unchanged to the new array  
			});

		default:
			return state; 
	};
};


const getNotesList = dispatch => {
	return async () => {
		const response = await API.graphql(graphqlOperation(listNotes))
		const allItems = response.data.listNotes.items
		dispatch ({ type: 'get_notes_list', payload: allItems })
	};
};

const addTestNote = dispatch => {
	return () => { 
		dispatch({ type:'add_test_note' }); 
	};
}; 

const deleteMyNote = dispatch => {
    return async (id) => {
		const response = await API.graphql(graphqlOperation(deleteNote, {input: {id}}));
		const delNoteId = response.data.deleteNote.id	
		dispatch({ type: 'delete_note', payload: delNoteId });
    };
};
			
const addNewNote = dispatch => {
	return async (note) => {
		const response = await API.graphql(graphqlOperation(createNote, {input: { note }}))
		const newNote = response.data.createNote
		dispatch ({type: 'add_note', payload: newNote });
	};
};

const editNote = dispatch => {
	return async (id, note) => {
		const response = await API.graphql(graphqlOperation(updateNote, {input: { id, note }}))
		const chgNote = response.data.updateNote
		console.log(chgNote)
		dispatch({ type: 'edit_note', payload: chgNote });
    };
};


export const  { Context, Provider } = createDataContext(
	noteReducer, 
	{ addTestNote, deleteMyNote, addNewNote, editNote, getNotesList }, 
	[]
); 
