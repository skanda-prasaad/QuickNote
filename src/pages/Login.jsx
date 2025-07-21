import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  function handleLogin(){
    if(user.trim()){
        localStorage.setItem("user", user);
        navigate('/dashboard');
    }
  }
  return (
    <>
      <h2>Login</h2>
      <input type="text" value={user} onChange={(e) => setUser(e.target.value)}/>
      <button onClick={handleLogin}>Login</button>
    </>
  );
}
