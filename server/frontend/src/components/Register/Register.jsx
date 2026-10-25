import React, { useState } from "react";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();
    const res = await fetch(window.location.origin + "/djangoapp/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    });
    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem("username", json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
  };

  const box = { margin: "10px 0" };
  const input = { width: "100%", padding: "8px" };

  return (
    <div style={{ maxWidth: "420px", margin: "40px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <div style={{ textAlign: "right" }}>
        <a href="/" onClick={(e) => { e.preventDefault(); gohome(); }} style={{ cursor: "pointer" }}>Close</a>
      </div>
      <h2>Sign Up</h2>
      <form onSubmit={register}>
        <div style={box}>
          <label>Username</label>
          <input type="text" name="username" placeholder="Username" style={input}
            onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div style={box}>
          <label>First Name</label>
          <input type="text" name="first_name" placeholder="First Name" style={input}
            onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div style={box}>
          <label>Last Name</label>
          <input type="text" name="last_name" placeholder="Last Name" style={input}
            onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div style={box}>
          <label>Email</label>
          <input type="email" name="email" placeholder="Email" style={input}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div style={box}>
          <label>Password</label>
          <input type="password" name="psw" placeholder="Password" style={input}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" style={{ padding: "8px 20px" }}>Register</button>
      </form>
    </div>
  );
};

export default Register;