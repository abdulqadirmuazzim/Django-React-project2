import React from "react";

function Note({note, onDelete}) {

    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

  return (
    <div className="container-fluid my-3">
      <div className="card text-start">
        <div className="card-header"> by {note.author}</div>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.content}
          </p>
          <button onClick={onDelete} className="btn btn-outline-danger">
            Delete Note
          </button>
        </div>
        <div className="card-footer text-body-secondary">{formattedDate}</div>
      </div>
    </div>
  );
}

export default Note;
