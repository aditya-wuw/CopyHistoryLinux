import {  useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
   
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }
  return (
    <main className="container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
        className="p-2 rounded-md m-2"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit" className="bg-blue-500 p-2 rounded-md">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
