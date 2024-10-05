  import React, { createContext, useState, useContext } from 'react';
  import { createTheme, ThemeProvider } from '@mui/material/styles';
  import { CssBaseline } from '@mui/material';

  const ThemeContext = createContext();

  export const ThemeProviderComponent = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const theme = createTheme({
      palette: {
        mode: isDarkMode ? 'dark' : 'light',
        primary: {
          main: '#0277bd',
        },
        background: {
          default: isDarkMode ? '#121212' : '#ffffff', // Dark background
          paper: isDarkMode ? '#1d1d1d' : '#ffffff', // Paper background
        },
        text: {
          primary: isDarkMode ? '#ffffff' : '#000000', // Text color for dark and light mode
          secondary: isDarkMode ? '#b0bec5' : '#616161', // Secondary text for dark and light mode
          disabled: isDarkMode ? '#757575' : '#9e9e9e', // Disabled text
          hint: isDarkMode ? '#eeeeee' : '#333333', // Hints or light text
        },
      },
      components: {
        MuiDataGrid: {
          styleOverrides: {
            root: {
              backgroundColor: isDarkMode ? '#424242' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#000000',
              borderColor: isDarkMode ? '#333' : '#ddd', // Grid borders for dark/light mode
            },
            cell: {
              color: isDarkMode ? '#e0e0e0' : '#000000', // Cell text color
            },
            columnHeader: {
              color: isDarkMode ? '#e0e0e0' : '#000000', // Column header text color
              backgroundColor: isDarkMode ? '#333333' : '#f5f5f5', // Background for column header
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: isDarkMode ? '#1d1d1d' : '#f5f5f5', // AppBar background
              color: isDarkMode ? '#ffffff' : '#000000', // AppBar text
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              color: isDarkMode ? '#ffffff' : '#000000', // Button text color
              backgroundColor: isDarkMode ? '#333333' : '#e0f7fa', // Button background
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: isDarkMode ? '#1d1d1d' : '#ffffff', // Paper background
              color: isDarkMode ? '#ffffff' : '#000000', // Paper text color
            },
          },
        },
        MuiTooltip: {
          styleOverrides: {
            tooltip: {
              backgroundColor: isDarkMode ? '#616161' : '#f5f5f5', // Tooltip background
              color: isDarkMode ? '#ffffff' : '#000000', // Tooltip text
            },
          },
        },
      },
    });

    return (
      <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    );
  };

  export const useTheme = () => useContext(ThemeContext);
