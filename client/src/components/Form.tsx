import { useState } from "react";

export function Form({ onSubmit }) {
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userName);
  };
  return (
    <div>
      <h1>Welcome</h1>
      <p>Type in your username</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}
