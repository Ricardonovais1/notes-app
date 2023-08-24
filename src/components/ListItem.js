import React from "react";
import { Link } from "react-router-dom";

const getTitle = (note) => {
  let title = note.body.split('\n')[0]
  if (title.length > 45) {
    return title.slice(0, 45) + '...'
  }
  return title
}

const getDate = (note) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(note.updated_at).toLocaleDateString('pt-BR', options)
}

const ListItem = ({ note }) => {
  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
        <h4>{getTitle(note)}</h4>
        <p>{getDate(note)}</p>
      </div>
    </Link>
  );
};

export default ListItem;
