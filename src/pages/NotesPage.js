import React, { useState, useEffect } from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
import { createConsumer } from 'actioncable'


const NotesPage = () => {

  let [notes, setNotes] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
    getNotes()
=======
    // getNotes()
>>>>>>> e8af2b6ec6cf580d871ed370d4423d0cab1400a0
    getNotesChannel()
  }, [])

  const getNotesChannel = () => {
    const cable = createConsumer('https://rails-vxml.onrender.com/api/v1/notes/cable'); // Substitua pela URL correta

    const noteChannel = cable.subscriptions.create(
      { channel: 'NoteChannel' },
      {
        received: (data) => {
          if (data.type === 'index') {
            setNotes(data.notes);
          } else if (data.type === 'update') {
            const updatedNote = data.note;
            setNotes((prevNotes) =>
              prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
            );
          }
        },
      }
    );
  }

  const getNotes = async () => {
    let response = await fetch('https://rails-vxml.onrender.com/api/v1/notes/')
    let data = await response.json()
    setNotes(data)
  }

  return (
    <div className='notes'>

      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; Notas</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>

      <div className='notes-list'>
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>

      <AddButton />

    </div>
  )
}

export default NotesPage