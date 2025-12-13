import { useEffect, useState } from "react";
import "./App.css";
import Copy from "./components/tabs/Copy";
import { TabItem } from "./types/app.types";
import Nav from "./components/nav/Nav";
import { setupTray } from "./utils/systemtray";
import { register_shortcuts } from "./utils/globalshortcuts";
import Emoji from "./components/tabs/Emoji";
import { graphicEmojiArray, symbolEmoticonArray } from "./utils/emojidata";

function App() {
  const [ActiveTab, SetActiveTab] = useState<TabItem>({label:"copy"});
  useEffect(() => {
    setupTray();
    register_shortcuts();
  }, []);

  return (
    <main className="container select-none">
      <Nav ActiveTab={ActiveTab} SetActiveTab={SetActiveTab} />
      <strong className="flex justify-center">{ActiveTab.label}</strong>
      <div className="content overflow-y-scroll h-100 scroll-smooth mx-1">
        {ActiveTab.label === "copy" && <Copy />}
        {ActiveTab.label === "emoji" && <Emoji title={ActiveTab.label} emotes={graphicEmojiArray}/>}
        {ActiveTab.label === "symbols" && <Emoji title={ActiveTab.label} emotes={symbolEmoticonArray}/>}
      </div>
    </main>
  );
}

export default App;
