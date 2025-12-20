import { useEffect, useState } from "react";
import { history } from "../../types/app.types";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
// import { RiDeleteBin6Fill } from "react-icons/ri";
import { HandleCopy } from "../../utils/utils";
// import { VscPinned } from "react-icons/vsc";
import Records from "../Records";

const Copy = () => {
  const [History, setHistory] = useState<history[]>([]);
  const [Pinned, setPinned] = useState<history[]>([]);

  async function fetchHistory() {
    let history: history[] = await invoke("get_history");
    const Pinned: history[] = [];
    const notPinned: history[] = [];
    for (const rec of history) {
      rec.pinned ? Pinned.push(rec) : notPinned.push(rec);
    }
    setPinned(Pinned);
    setHistory(notPinned);
  }

  async function removeHistory(id: string) {
    await invoke("del_entry", { id: id });
    fetchHistory();
  }

  async function PinHistory(id: string) {
    await invoke("pin_history", { id: id });
    fetchHistory();
  }

  listen("clipboard-changed", async () => {
    fetchHistory();
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <main className="mr-1">
      {Pinned.length > 0 && (
        <div>
          <h1 className="mx-3">Pinned</h1>
          {Pinned.map((i, index) => (
            <Records
              key={index}
              i={i}
              HandleCopy={HandleCopy}
              PinHistory={PinHistory}
              removeHistory={removeHistory}
            />
          ))}
          <h1 className="flex justify-center border-b mx-2 pb-4" />
        </div>
      )}
      <div className="mt-5">
        {History.length !== 0 ? (
          History.map((i, index) => (
            <Records
              key={index}
              i={i}
              HandleCopy={HandleCopy}
              removeHistory={removeHistory}
              PinHistory={PinHistory}
            />
          ))
        ) : (
          <span className="flex justify-center mt-3 ml-3">may be copy something :3</span>
        )}
      </div>
    </main>
  );
};

export default Copy;
