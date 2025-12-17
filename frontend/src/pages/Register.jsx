import React, { useState } from "react";
import Home from "./Home";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleregister(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        toast.error("Registration failed");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      toast.success("Registered successfully");
      navigate("/notes");
    } catch (error) {
      console.error(error);
      toast.error("Error registering");
    }
  }

  return (
    <div>
      <Home />

      <div className="main">
        <div className="autho">
          <div className="backh">
            <Link to="/">
              <button>
                <ArrowLeftIcon /> Back to Home
              </button>
            </Link>
          </div>

          <form onSubmit={handleregister}>
            <div className="insert">
              <label>Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <br /><br />

              <label>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <br /><br />

              <label>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <br /><br />
            </div>

            <div className="butt">
              <button>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
