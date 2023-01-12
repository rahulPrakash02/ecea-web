import { Outlet, Route, Routes } from 'react-router-dom';
import { styled } from '@mui/system';
import { ThemeProvider } from '@mui/material';
import {
  useEffect, useMemo, useState,
} from 'react';
import AppBar from './components/Navigations/AppBar';
import SideBar from './components/Navigations/SideBar';
import BottomBar from './components/Navigations/BottomBar';
import router from './constants/routes';
import { darkTheme, lightTheme } from './config/themes';
import ThemingContext from './config/context';

const Structure = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  height: '100vh',
  width: '100vw',
  '@media (max-width: 767px)': {
    flexDirection: 'column',
  },
});

const Page = styled('div')(({ theme }) => ({
  flex: 1,
  height: 'fit-content',
  background: theme.palette.pageBgColor,
  animation: 'gradient 15s ease infinite',
  padding: '1.5rem 0rem',
  marginLeft: '226px',
  '@media (max-width: 767px)': {
    margin: '4.5rem 0',
  },
}));

const Layout = () => (
  <Structure>
    <AppBar />
    <SideBar />
    <Page>
      <Outlet />
    </Page>
    <BottomBar />
  </Structure>
);

const App = () => {
  const [theme, setTheme] = useState<string | null>('light');

  useEffect(() => {
    const prefTheme = localStorage.getItem('theme');
    setTheme(prefTheme ?? 'light');
  }, []);

  const themeMemo = useMemo(() => ({
    theme,
    setTheme,
  }), [theme]);

  return (
    <ThemingContext.Provider value={themeMemo}>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <Routes>
          <Route path="" element={<Layout />}>
            {router.map((nav) => (
              <Route
                key={nav.path}
                path={nav.path}
                element={nav.element}
              />
            ))}
          </Route>
        </Routes>
      </ThemeProvider>
    </ThemingContext.Provider>
  );
};

export default App;
