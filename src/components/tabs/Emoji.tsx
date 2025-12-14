import { useCallback, useEffect, useState } from "react";
import { HandleCopy, ParseAndGroupEmoji } from "../../utils/utils";
import SearchBox from "../SearchBox";
import { Emojies, GroupedEmojies } from "../../types/app.types";

interface props {
  emotes: Emojies[];
  title: string;
}
const Emoji = ({ emotes, title }: props) => {
  const [Filtered, SetFiltered] = useState<Emojies[]>(emotes);
  const [symbol, setSymbol] = useState<GroupedEmojies>();

  const ParsedEmoji = useCallback(() => {
    let d = ParseAndGroupEmoji(Filtered);
    setSymbol(d);
  }, [Filtered]);

  useEffect(() => {
    ParsedEmoji();
  }, [Filtered]);

  return (
    <main className="mt-2 mx-2">
      <nav className="mb-5">
        <SearchBox Searchdata={emotes} SetFiltered={SetFiltered} />
      </nav>
      <div>
        {Filtered.length > 0 && symbol ? (
          Object.entries(symbol).map(([sections, items]) => (
            <div key={sections}>
              <h1 className="text-sm m-1 mt-5">{sections}</h1>
              <div
                className={`${
                  sections === "Others" ? "grid grid-cols-5 text-xs" : "grid grid-cols-7"
                } grid-rows-1 gap-2`}
              >
                {items.map((i, index) => (
                  <button
                    key={index + i.label}
                    className="p-2 bg-blue-500/30 relative group rounded-md"
                    onClick={() => HandleCopy(i.emoji)}
                  >
                    {i.emoji}
                    <span
                      className={`opacity-0 text-xs pointer-events-none group-hover:opacity-100 absolute ${
                        sections === "Others" ? "bottom-13" : "bottom-11"
                      } left-0 right-10 bg-blue-500  text-white flex justify-center items-center z-10 rounded-md p-2 px-2 w-full line-clamp-1`}
                    >
                      {i.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="mt-1 flex justify-center">{title} not found</div>
        )}
      </div>
    </main>
  );
};

export default Emoji;
