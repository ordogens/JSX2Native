import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './../styles/ThethemeSwitcher.css'

export const ThemeSwitcher = () => {
    const { toggleTheme } = useContext(AppContext);

    return <button className='boton' onClick={toggleTheme}>Toggle Theme</button>;
};
