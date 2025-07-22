import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
    } else {
      alert("You are not logged in!");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  if (!user) return null;

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

  const pinnedNotes = notes.filter((note) => note.pinned);
  const otherNotes = notes.filter((note) => !note.pinned);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user}!</h1>

      <form
        onSubmit={handleAddNote}
        className="mb-8 p-4 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Add a New Note</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Note body"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          + Add Note
        </button>
      </form>

      <div>
        <h2 className="text-2xl font-bold mb-4">Pinned Notes</h2>
        {pinnedNotes.length === 0 ? (
          <p>No pinned notes yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedNotes.map((note) => (
              <NoteCard
                key={note.id}
                {...note}
                onDelete={() => handleDeleteNote(note.id)}
                onPin={() => handleTogglePin(note.id)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Other Notes</h2>
        {otherNotes.length === 0 ? (
          <p>No other notes yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherNotes.map((note) => (
              <NoteCard
                key={note.id}
                {...note}
                onDelete={() => handleDeleteNote(note.id)}
                onPin={() => handleTogglePin(note.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
