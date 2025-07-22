import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch notes from API
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Check login
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      alert("You are not logged in !");
      navigate("/login");
    } else {
      setUser(savedUser);
    }
  }, [navigate]);

  if (!user) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  function handleAddNote(e) {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      return alert("Both title and body are required");
    }

    const newNote = {
      id: Date.now(),
      title,
      body,
      pinned: false,
    };

    setNotes((prev) => [newNote, ...prev]);
    setTitle("");
    setBody("");
  }

  function handleDeleteNote(id) {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    }
  }
  function handleTogglePin(id) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  }

  const sortedNotes = [...notes].sort((a, b) => b.pinned - a.pinned);

  return (
    <div>
      <form onSubmit={handleAddNote}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          required
        />
        <br />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Note body"
          required
        />
        <br />
        <button type="submit">+ Add Note</button>
      </form>

      <h2>Welcome {user}</h2>
      <p>This is your dashboard</p>
      {notes.length === 0 ? (
        <p>No Notes Yet</p>
      ) : (
        sortedNotes
          .slice(0, 10)
          .map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              body={note.body}
              title={note.title}
              pinned={note.pinned}
              trashMode={true}
              onDelete={() => handleDeleteNote(note.id)}
              onPin={() => handleTogglePin(note.id)}
            />
          ))
      )}
    </div>
  );
}
