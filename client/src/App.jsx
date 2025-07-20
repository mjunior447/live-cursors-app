import { useState } from "react";
import { Form } from "./components/Form";
import { Home } from "./Home";

function App() {
  const [username, setUsername] = useState("");

  return username ? (
    <Home username={username} />
  ) : (
    <Form onSubmit={setUsername} />
  );
}

export default App;
