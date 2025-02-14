import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const ThemeSwitcher = () => {
    const { toggleTheme } = useContext(AppContext);

    return <button onClick={toggleTheme}>Toggle Theme</button>;
};
