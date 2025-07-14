import React, { useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Note";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // functions
  useEffect(() => {
    getNotes();
  }, []);

  // function to get the notes
  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
        setLoading(false)
      })
      .catch((err) => alert(err));
  };
  // A function to delete notes
  function deleteNote(id) {
    console.log(id);
    api
      .delete(`api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted");
        else alert("Failed to delete note!!");
        getNotes();
      })
      .catch((err) => alert(err));
  }
  // a funtions to create notes
  function createNote(e) {
    setLoading(true)
    e.preventDefault();
    api
    .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note Created");
        else alert("Something went wrong!\nFailed to create notes");
        getNotes();
      })
      .catch((err) => alert(err));
    setContent("");
    setTitle("");
  }
  return (
    <>
      <div className="container-fluid">
        {/* Notes display */}
        <div className="container-md">
          <h2>Notes</h2>
          <hr />
          {notes.map((note) => (
            <Note
              note={note}
              onDelete={() => deleteNote(note.id)}
              key={note.id}
            />
          ))}
        </div>
        <form onSubmit={createNote} className="form-control">
          <label htmlFor="title" className="col-form-label">
            Title:
          </label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          {/* content */}
          <label htmlFor="content" className="col-form-label">
            Content:
          </label>
          <br />
          <textarea
            name="content"
            id="content"
            className="form-control"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <br />
          {loading ? (
            <button class="btn btn-success" type="button" disabled>
              <span
                class="spinner-grow spinner-grow-sm"
                aria-hidden="true"
              ></span>
              <span role="status">Loading...</span>
            </button>
          ) : (
            <button className="btn btn-success">Submit</button>
          )}
        </form>
      </div>
    </>
  );
}

export default Home;
