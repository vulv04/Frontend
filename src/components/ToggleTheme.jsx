import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="themeSwitch"
        checked={theme === "dark"}
        onChange={toggleTheme}
        title="Toggle theme"
      />
    </div>
  );
};

export default ToggleTheme;
