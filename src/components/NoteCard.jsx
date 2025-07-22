// src/components/NoteCard.jsx

import React from "react";

export default function NoteCard({
  title,
  body,
  pinned = false,
  onDelete,
  onPin,
}) {
  return (
    <div
      className={`p-4 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg ${pinned ? "bg-yellow-100" : "bg-white"
        }`}
    >
      <div className="flex justify-between items-start">
        <h3 className={`text-lg font-bold ${pinned ? "text-yellow-800" : ""}`}>
          {title}
        </h3>
        <button
          onClick={onPin}
          title={pinned ? "Unpin note" : "Pin note"}
          className="text-xl"
        >
          {pinned ? "📌" : "📍"}
        </button>
      </div>

      <p className="mt-2 text-gray-700">{body}</p>
      <button
        onClick={onDelete}
        title="Delete note"
        className="mt-4 text-red-500 hover:text-red-700"
      >
        🗑️ Delete
      </button>
    </div>
  );
}
