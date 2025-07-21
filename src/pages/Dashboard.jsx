import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  useEffect(() => {
    setLoading(true)

  },[notes])

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

  return (
    <div>
      <h2>Welcome {user}</h2>
      <p>This is your dashboard</p>

    </div>
  );
}
