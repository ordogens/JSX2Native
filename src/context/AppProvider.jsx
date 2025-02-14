import { useState } from 'react';
import { AppContext } from './AppContext';
import PropTypes from 'prop-types';
export const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <AppContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </AppContext.Provider>
    );
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};