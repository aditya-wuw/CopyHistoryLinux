import { Tab } from "../../types/app.types";
type NavProps = {
  ActiveTab: Tab;
  SetActiveTab: React.Dispatch<React.SetStateAction<Tab>>;
};

const Nav = ({ ActiveTab, SetActiveTab }: NavProps) => {
  const items: Tab[] = ["copy", "emoji", "symbols"];
  return (
    <nav className="sticky grid grid-cols-3 gap-4 place-items-center group ml-3">
      {items.map((i, index) => (
        <button
          key={index}
          onClick={() => SetActiveTab(i)}
          className={`dark:hover:bg-blue-800 hover:bg-blue-300 ${
            ActiveTab === i && "dark:bg-blue-800 bg-blue-300"
          } p-2 w-full rounded-xl mb-2`}
        >
          {i}
        </button>
      ))}
    </nav>
  );
};

export default Nav;
