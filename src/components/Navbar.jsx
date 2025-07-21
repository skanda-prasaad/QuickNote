import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <span>
        <h1>QuickNote Pro</h1>
      </span>
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">login</Link>
        <Link to="/dashboard">dashboard</Link>
      </div>
    </>
  );
}
