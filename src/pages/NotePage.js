import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

function NotePage() {

  let navigate = useNavigate()

  let [note, setNote] = useState(null);

  const params = useParams();

  let noteId = '';

  if (params.id !== 'new') {
    noteId = parseInt(params.id, 10);
  } else {
    noteId = params.id;
  }

  console.log('NOTE id', noteId)
  let getNote = async () => {
    if (noteId === 'new') return
    let response = await fetch(`https://rails-vxml.onrender.com/api/v1/notes/${noteId}`);
    let data = await response.json();

    setNote(data);
  };

  useEffect(() => {
    getNote();
  }, [noteId]);

  let createNote = async () => {
    await fetch(`https://rails-vxml.onrender.com/api/v1/notes/`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({ ...note, 'created_at': new Date() })
    });
  };

  let updateNote = async () => {
    await fetch(`https://rails-vxml.onrender.com/api/v1/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({ ...note, 'updated_at': new Date() })
    });
  };

  let deleteNote = async () => {
    await fetch(`https://rails-vxml.onrender.com/api/v1/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(note)
    });
    navigate("/")
  }

  let handleSubmit = () => {
    if (noteId !== 'new' && !note.body) {
      deleteNote();
    } else if (noteId !== 'new') {
      updateNote();
    } else if (noteId === 'new' && note !== null) {
      createNote();
    }
    navigate("/")
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {noteId !== 'new' ? (
          <button onClick={deleteNote}>Apagar</button>
        ) : (
          <button onClick={handleSubmit}>Gravar</button>
        )}

      </div>

      <textarea
        onChange={(e) => setNote({ ...note, body: e.target.value })}
        value={note?.body}
      ></textarea>
    </div>
  );
}

export default NotePage;
