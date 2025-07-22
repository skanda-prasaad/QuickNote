// src/components/NoteCard.jsx

import React from "react";

export default function NoteCard({
  title,
  body,
  pinned = false,
  trashMode = true,
  onDelete,
  onPin,
}) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        backgroundColor: pinned ? "#f9f9f9" : "#fff",
      }}
    >
      <h3 style={{ fontWeight: pinned ? "bold" : "normal" }}>
        {title}
        <button
          style={{ marginLeft: "10px" }}
          onClick={onPin}
          title={pinned ? "Unpin note" : "Pin note"}
        >
          {pinned ? "📌" : "📍"}
        </button>
      </h3>

      <p>{body}</p>
      {trashMode && (
        <button
          style={{ color: "red", marginTop: "8px" }}
          onClick={onDelete}
          title="Delete note"
        >
          🗑️
        </button>
      )}
    </div>
  );
}
