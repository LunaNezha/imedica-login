import { IonButtons, IonHeader, IonMenuButton } from "@ionic/react";
import LanguageSwitcher from "../language-switcher";
import ThemeSwitcher from "../theme-switcher";

const Navbar = () => {
  return (
    <IonHeader className="border-0">
      <div className="flex items-center justify-between bg-white-50 px-5 py-3 dark:bg-big-stone-950">
        {/* menu toggle button */}
        <IonButtons
          slot="start"
          className="flex cursor-pointer items-center justify-center"
        >
          <IonMenuButton>
            <i className="fi fi-br-bars-staggered text-xl text-white-950 dark:text-white-200"></i>
          </IonMenuButton>
        </IonButtons>

        {/* left actions */}
        <div className="flex items-center gap-3">
          {/* theme switcher */}
          <ThemeSwitcher />

          {/* language switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </IonHeader>
  );
};

export default Navbar;
