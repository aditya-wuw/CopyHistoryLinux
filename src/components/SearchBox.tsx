import { BiSearch } from "react-icons/bi";

const SearchBox = ({Searchdata } : any) => {
    function handlesearch() {
    alert("searching");
    console.log(Searchdata);
  }
  return (
    <div>
      <div className="flex justify-between gap-3">
        <input
          placeholder="search"
          type="text"
          className="outline-0 border-b dark:bg-blue-600/20 bg-blue-400/20 p-1 pl-2 w-full"
        />
        <button
          className="p-3 justify-center items-center flex bg dark:bg-blue-600/20 bg-blue-400/20 rounded-md"
          onClick={() => handlesearch()}
        >
          <BiSearch className="hover:scale-115" />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
