import { useState } from "react";
import "./App.css";
import Copy from "./components/tabs/Copy";
import Emoji from "./components/tabs/Emoji";
import Symbol from "./components/tabs/Symbol";
import { Tab } from "./types/app.types";
import Nav from "./components/nav/Nav";

function App() {
  const [ActiveTab, SetActiveTab] = useState<Tab>("copy");
  return (
    <main className="container">
      <Nav ActiveTab={ActiveTab} SetActiveTab={SetActiveTab} />
      <div className="content">
        {ActiveTab === "copy" && <Copy />}
        {ActiveTab === "emoji" && <Emoji />}
        {ActiveTab === "symbols" && <Symbol />}
      </div>
    </main>
  );
}

export default App;
