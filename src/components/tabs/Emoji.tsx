import SearchBox from "../SearchBox";

const Emoji = () => {
  return (
    <main className="mx-2 mt-1">
      <nav>
        <SearchBox Searchdata={['apple','pinapple']} />
      </nav>
    </main>
  );
};

export default Emoji;
