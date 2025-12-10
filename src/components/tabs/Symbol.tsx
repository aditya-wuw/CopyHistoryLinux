import { symbolEmoticonArray } from "../../utils/emojidata";
import { HandleCopy } from "../../utils/utils";
import SearchBox from "../SearchBox";

const Symbol = () => {
  async function handleCopySymbol(e: string) {
    if (!e) return;
    await navigator.clipboard.writeText(e);
  }
  return (
    <main className="mt-2 mx-2">
      <nav className="mb-5">
        <SearchBox Searchdata={['Me','you','UwU']}/>
      </nav>
      <div className="grid grid-cols-5 grid-rows-3 gap-2">
        {symbolEmoticonArray.map((i) => (
          <button
            onClick={() => HandleCopy(i.emoji)}
            key={i.label}
            className="bg-blue-500/20 hover:bg-blue-500/50  rounded-md w-full h-full flex justify-center items-center"
          >
            {i.emoji}
          </button>
        ))}
      </div>
    </main>
  );
};

export default Symbol;
