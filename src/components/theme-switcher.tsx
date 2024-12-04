import { DARK } from "@src/constants/theme.const";
import { useTheme } from "@src/providers/theme-provider";
import { cn } from "@src/utils/classnames";
import { Button } from "./buttons";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      padding={"square-sm"}
      variant={"filled-default-bordered"}
      round={"full"}
      shadows={"none"}
      onClick={toggleTheme}
    >
      <i
        className={cn(
          "text-lg",
          theme === DARK ? "fi fi-rr-moon" : "fi fi-rr-brightness",
        )}
      ></i>
    </Button>
  );
};

export default ThemeSwitcher;
