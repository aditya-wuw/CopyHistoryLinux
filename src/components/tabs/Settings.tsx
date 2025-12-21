import { disable, enable, isEnabled } from "@tauri-apps/plugin-autostart";
import { useCallback, useEffect, useState } from "react";
import { SliderButton } from "../SliderButton";
import { GrGithub } from "react-icons/gr";
import { BsTwitter, BsYoutube } from "react-icons/bs";
import { currentWindow } from "../../utils/utils";
// import { invoke } from "@tauri-apps/api/core";

const Settings = () => {
  const [isStartUpEnabled, SetStartUp] = useState<boolean>(true);
  const [darkmode, setdarkmode] = useState<boolean>(true);
  const StartUpCheck = useCallback(async () => {
    console.log(await isEnabled());
    let isStartUpEnabled = await isEnabled();
    SetStartUp(isStartUpEnabled);
  }, [isEnabled]);

  function HandleStartUp() {
    isStartUpEnabled ? disable() : enable();
    StartUpCheck();
  }

  async function EnableDarkMode() {
    const storedTheme = localStorage.getItem("theme") ?? "light";
    const nextTheme = storedTheme === "dark" ? "light" : "dark";
    await currentWindow.setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    setdarkmode(nextTheme === "dark");
    console.log("Theme set to:", nextTheme);
  }

  // function HandleRecordLimit(lim: string) {
  //   invoke("get_enties_limit_by_user",{limit:lim});
  // }

  useEffect(() => {
    StartUpCheck();
    const storedTheme = localStorage.getItem("theme") ?? "light";
    setdarkmode(storedTheme === "dark");
  }, []);

  return (
    <main className="px-3">
      <section>
        <div className="flex justify-between items-center">
          <strong>Enable StartUp</strong>
          <SliderButton value={isStartUpEnabled} SetValue={SetStartUp} DoSomthing={HandleStartUp} />
        </div>
        <p className="text-[13px] mt-5 p-2 bg-blue-600/30 rounded-md">
          Automatically launches the application as soon as your operating system boots up
        </p>
      </section>
      <section className="mt-5">
        <div className="flex justify-between items-center">
          <strong>Enable Dark mode</strong>
          <SliderButton value={darkmode} SetValue={setdarkmode} DoSomthing={EnableDarkMode} />
        </div>
        <p className="text-[13px] mt-5 p-2 bg-blue-600/30 rounded-md">
          Makes the theme darker and less painful for your eyes to witness. Peak
        </p>
      </section>
      {/* <section>
        <strong>Record Limit</strong>
        <div>
          <input
            type="number"
            name="Record_limit"
            id="Limit"
            onChange={(e) => HandleRecordLimit(e.target.value)}
          />
        </div>
      </section> */}
      <section className="mt-5 mb-5">
        <h1 className="font-bold">ShortCuts</h1>
        <div className="flex justify-between  items-center">
          <span className="ml-3">show the app</span>
          <input
            className="p-1 bg-blue-600/30 rounded-md text-center w-30"
            type="text"
            disabled
            value={"Control+Alt+S"}
          />
        </div>
        <div className="flex justify-between  items-center mt-3">
          <span className="ml-3">hide the app</span>
          <input
            className="p-1 bg-blue-600/30 rounded-md text-center w-30"
            type="text"
            disabled
            value={"Control+Alt+X"}
          />
        </div>
        <p className="text-[13px] mt-2 p-2 bg-blue-600/30 rounded-md">
          used to quickly open up the application <br /> (will be editable soon)
        </p>
      </section>

      <footer>
        <section className="select-none flex gap-2 items-end">
          <img src={"/Copychan.png"} alt="copychan" draggable="false" />
          <div className="pb-6">
            <h1 className="text-[13px] text-gray-300">test build 1.0.3</h1>
            <h1>Support me</h1>
            <span className="flex gap-2">
              <a href="https://github.com/aditya-wuw/Copy-Chan" target="_blank">
                <GrGithub size={20} className="hover:text-blue-300"/>
              </a>
              <a href="https://www.youtube.com/@NoFaceIsDev" target="_blank">
                <BsYoutube size={20} className="hover:text-red-500"/>
              </a>
              <a href="https://x.com/GenzaGenza" target="_blank">
                <BsTwitter size={20} className="hover:text-blue-500"/>
              </a>
            </span>
          </div>
        </section>
      </footer>
    </main>
  );
};

export default Settings;
