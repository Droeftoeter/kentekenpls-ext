import React from 'react';
import { ThemeProvider } from 'styled-components';

import useMatchMedia from './hooks/useMatchMedia';

type ThemeProps = {
    children: React.ReactNode
};

interface Theme {
    surfaceColor: string
    focusColor:   string
    borderColor:  string

    textColor:       string
    subtleTextColor: string

    iconColor: string
}

const darkTheme: Theme = {
    surfaceColor:    '#121212',
    focusColor:      '#242424',
    borderColor:     '#363636',

    textColor:       'hsla(0, 100%, 100%, 1)',
    subtleTextColor: 'hsla(0, 100%, 100%, .67)',

    iconColor:       'hsla(0, 100%, 100%, .67)',
};

const lightTheme: Theme = {
    surfaceColor:    '#FFFFFF',
    focusColor:      'hsla(0, 0%, 0%, .08)',
    borderColor:     'hsla(0, 0%, 0%, .08)',

    textColor:       'hsla(0, 0%, 0%, .87)',
    subtleTextColor: 'hsla(0, 0%, 0%, .67)',

    iconColor:       'hsla(0, 0%, 0%, .47)',
};

const Theme = ({ children }: ThemeProps) => {
    const darkMode = useMatchMedia('(prefers-color-scheme: dark)');

    return (
        <ThemeProvider
            theme={ darkMode ? darkTheme : lightTheme }
        >
            { children }
        </ThemeProvider>
    );
};

export default Theme;
