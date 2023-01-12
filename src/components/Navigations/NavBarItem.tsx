import { useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { useMemo } from 'react';
import { IconContext } from 'react-icons';
import { Link, useLocation } from 'react-router-dom';
import { NavindicatorProps, NavitemProps } from './types';

const Navitem = styled('li')({
  listStyleType: 'none',
  margin: '0.2rem 0',
  '@media (max-width: 767px)': {
    margin: '0.1rem 0 0rem 0',
  },
});

const NavitemLink = styled('a')<NavindicatorProps>(({ theme, bg, isActive }) => ({
  fontSize: '1rem',
  display: 'flex',
  fontWeight: 'bold',
  gap: '0.75rem',
  padding: '0.7rem 0 0.7rem 1.2rem',
  margin: '0 0.5rem 0 0.25rem',
  cursor: 'pointer',
  color: isActive ? theme.palette.navActiveColor : theme.palette.navInActiveColor,
  background: isActive ? theme.palette.navDefaultBgColor : theme.palette.navInActiveBgColor,
  borderRadius: '0.8rem',
  span: {
    fontSize: '0.9rem',
    marginTop: '0.2rem',
  },
  ':hover': {
    color: theme.palette.navHoverColor,
    background: bg,
  },
  '@media (max-width: 767px)': {
    flexDirection: 'column',
    gap: '0rem',
    padding: '0.2rem 0rem 0rem 0',
    margin: '0',
    span: {
      fontSize: '0.6rem',
    },
    color: isActive ? theme.palette.navActiveColorMobile : theme.palette.navInActiveColorMobile,
    background: theme.palette.navInActiveBgColor,
    ':hover': {
      color: isActive ? theme.palette.navActiveColorMobile : theme.palette.navInActiveColorMobile,
      background: theme.palette.navInActiveBgColor,
    },
  },
}));

const NavBarItem = ({
  path, isHref, bgColor, element, label,
}: NavitemProps) => {
  const location = useLocation();
  const theme = useTheme();
  const iconValue = useMemo(() => ({
    className: 'icon',
  }), []);
  return (
    <Navitem key={path}>
      <Link to={path} target={isHref ? '_blank' : undefined}>
        <NavitemLink
          href={path}
          bg={bgColor === undefined ? theme.palette.navHoverBgColor : bgColor}
          isActive={location.pathname === `/${path}`}
        >
          <IconContext.Provider
            value={iconValue}
          >
            {element}
          </IconContext.Provider>
          <span>{label}</span>
        </NavitemLink>
      </Link>
    </Navitem>
  );
};

export default NavBarItem;
