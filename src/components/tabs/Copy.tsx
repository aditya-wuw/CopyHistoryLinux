import { useEffect, useState } from "react";
import { history } from "../../types/app.types";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { HandleCopy } from "../../utils/utils";
import { VscPinned } from "react-icons/vsc";

const Copy = () => {
  const [History, setHistory] = useState<history[]>([]);

  async function fetchHistory() {
    let history: history[] = await invoke("get_history");
    setHistory(history.reverse());
  }

  async function removeHistory(id: string) {
    setHistory(History.filter((prev) => prev.id != id));
    await invoke("del_entry", { id: id });
  }

  async function PinHistory(id: string) {
    await invoke("pin_history", { id: id });
  }
  listen("clipboard-changed", async () => {
    fetchHistory();
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <main className="mr-1">
      {History.length === 0 ? (
        <span className="flex justify-center mt-3 ml-3">no history</span>
      ) : (
        History.map((i) => (
          <div key={i.id} className="flex justify-between m-2 items-start">
            <div
              className="p-3 mt-2 bg-blue-500/20  hover:bg-blue-500 hover:text-white w-75 max-h-27 line-clamp-4 overflow-hidden rounded-md cursor-pointer"
              onClick={() => HandleCopy(i.item)}
            >
              {i.item}
            </div>
            <div className="flex gap-1 mt-2">
              <button className="h-fit rounded-md" onClick={() => PinHistory(i.id)}>
                <VscPinned size={i.pinned ? 25 : 20} className="hover:text-red-500 hover:scale-130" />
              </button>
              <button className="h-fit rounded-md" onClick={() => removeHistory(i.id)}>
                <RiDeleteBin6Fill size={17} className="hover:text-red-500 hover:scale-130" />
              </button>
            </div>
          </div>
        ))
      )}
    </main>
  );
};

export default Copy;
