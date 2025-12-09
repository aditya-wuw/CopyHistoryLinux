import { useEffect, useState } from "react";
import { history } from "../../types/app.types";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

const Copy = () => {
  const [History, setHistory] = useState<history[]>([]);
  async function HandleClipbord(item: string) {
    await navigator.clipboard.writeText(item);
  }

  async function fetchHistory() {
    //fetches all the text from the text
    let history: history[] = await invoke("get_history");
    setHistory(history.reverse());
  }

  async function removeHistory(id: string) {
    //logic for removing
    setHistory(History.filter((prev) => prev.id != id));
    await invoke("del_entry", { id: id });
  }

  listen("clipboard-changed", async () => {
    fetchHistory();
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <main className="mb-20 mr-2">
      {History.length === 0 ? (
        <span className="flex justify-center">no history</span>
      ) : (
        History.map((i) => (
          <div key={i.id} className="flex justify-between m-2 items-start gap-2">
            <button
              className="p-3 hover:bg-blue-500 w-80 wrap-break-word rounded-md mb-2"
              onClick={() => HandleClipbord(i.item)}
            >
              {i.item}
            </button>
            <button className="bg-red-500 p-2 h-fit rounded-md" onClick={() => removeHistory(i.id)}>
              delete
            </button>
          </div>
        ))
      )}
    </main>
  );
};

export default Copy;
