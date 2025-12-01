// import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import { history } from "../../types/app.types";

const Copy = () => {
  const [History, setHistory] = useState<history[]>([]);
  // frontend
  function removeHistory(id: string) {
    //logic for removing
    setHistory(History.filter((prev=>prev.id!=id)));
    // call the rust backend to clear the histroy
    //rust api calls ==> await invoke("DeleteData", { id });
    alert(`${id} deleted`);
  }

  return (
    <main>
      {History.length === 0 ? <span className="flex justify-center">no history</span>:History.map((i) => (
        <div key={i.id} className="flex justify-between m-2">
          <div className="p-3 hover:">{i.item}</div>
          <button className="bg-red-500 p-2" onClick={() => removeHistory(i.id)}>
            delete
          </button>
        </div>
      ))}
    </main>
  );
};

export default Copy;
