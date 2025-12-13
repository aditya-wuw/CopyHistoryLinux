import { BiSearch } from "react-icons/bi";
import { Emojies } from "../types/app.types";
import { Dispatch, SetStateAction } from "react";

interface props {
  Searchdata: Emojies[];
  SetFiltered: Dispatch<SetStateAction<Emojies[]>>;
}

const SearchBox = ({ Searchdata, SetFiltered }: props) => {
  function handlesearch(SearchTerms: string) {
    const terms = SearchTerms.toLowerCase().trim();
    if (!terms) return SetFiltered(Searchdata);
    const f = Searchdata.filter((i) => {
      const EmojiMatch = i.emoji.trim().includes(terms);
      const LabelMatch = i.label.trim().includes(terms);
      const KeywordsMatch = i.keywords.some((k) => k.trim().includes(terms));
      return EmojiMatch || LabelMatch || KeywordsMatch;
    });

    SetFiltered(f);
  }

  return (
    <div>
      <div className="flex justify-between gap-3">
        <form className="border-b dark:bg-blue-600/20 bg-blue-400/20 flex items-center w-full px-2">
          <BiSearch className="hover:scale-115" />
          <input
            placeholder="search"
            type="text"
            onChange={(e) => {
              handlesearch(e.target.value);
            }}
            className="outline-0  p-1 pl-2 w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBox;
