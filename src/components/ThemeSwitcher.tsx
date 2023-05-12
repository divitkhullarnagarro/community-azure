import { useContext } from 'react';
import WebContext from '../Context/WebContext';
import ThemeSwitcherCss from '../assets/themeSwitcher.module.css';
import { encryptString } from 'assets/helpers/EncryptDecrypt';

const ThemeSwitcher = (): JSX.Element => {
  const { darkMode, setDarkMode } = { ...useContext(WebContext) };
  const handleThemeSwitch = () => {
    localStorage &&
      localStorage?.setItem('theme', encryptString(JSON.stringify({ darkTheme: !darkMode })));
    !!setDarkMode && setDarkMode(!darkMode);
  };
  return (
    <div className={ThemeSwitcherCss.container}>
      <button className={ThemeSwitcherCss.button} onClick={handleThemeSwitch}>
        {darkMode ? (
          <img
            src="https://cdn-icons-png.flaticon.com/32/3856/3856888.png"
            className={ThemeSwitcherCss.image}
            style={darkMode && { filter: 'invert(1)' }}
            alt="Disable Dark Mode"
            title="Disable Dark Mode"
            width={20}
            height={20}
          />
        ) : (
          <img
            src="https://cdn-icons-png.flaticon.com/32/3856/3856912.png"
            className={ThemeSwitcherCss.image}
            alt="Enable Dark Mode"
            title="Enable Dark Mode"
            width={20}
            height={20}
          />
        )}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
