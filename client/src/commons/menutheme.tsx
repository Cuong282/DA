import { BsFillMoonFill } from "react-icons/bs";
import { LuSunMoon, } from "react-icons/lu";
import { WiMoonAltWaningCrescent5 } from "react-icons/wi";
import { ITheme } from "../interfaces/interfaces";


const cssMenuTheme = " py-2 px-2 flex items-center justify-between cursor-pointer w-44 select-none";
const activeTheme = "bg-theme-dropdown-active" + cssMenuTheme;
const bgTheme = "bg-theme-dropdown-background" + cssMenuTheme;

const itemThemes = [
  {
    name: "Giao diện tối",
    icons: <BsFillMoonFill className="ml-5 text-theme-text-tertiary" />,
  },
  {
    name: "Giao diện sáng",
    icons: <LuSunMoon className="ml-5 text-theme-text-tertiary" />,
  },
  {
    name: "Giao diện Oled",
    icons: (
      <WiMoonAltWaningCrescent5 className="ml-5 text-theme-text-tertiary" />
    ),
  },
];


export const renderMenuTheme = (state: ITheme, setState: any) => {
  return (
    <>
      {itemThemes.map((item, i: any) => {
        const index: ITheme = i + 1;
        return (
          <div
            key={i}
            onClick={() => {
              setState(index);
              localStorage.setItem("cusor", JSON.stringify(index));
            }}
            className={index === state ? activeTheme : bgTheme}
          >
            <p className="text-theme-text-tertiary">{item.name}</p>
            {item.icons}
          </div>
        );
      })}
    </>

  );
};

export const renderIconTheam = (state: ITheme) => {
  return itemThemes[state - 1].icons;
};

