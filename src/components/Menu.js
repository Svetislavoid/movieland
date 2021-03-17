import React from 'react';
import { Link } from 'react-router-dom';

// styles
import '@/components/Menu.css';

const Menu = (props) => {
  const {
    loggedIn,
    login,
    logout
  } = props;

  return (
    <div className='ml-menu'>
      {
        loggedIn && (
          <>
            <Link
              className='ml-menu-link'
              to='/favorites'
            >
              <i className='material-icons ml-menu-icons'>
                favorite
              </i>
              Favorites
            </Link>

            <Link
              className='ml-menu-link'
              to='/watch-later'
            >
              <i className='material-icons ml-menu-icons'>
                watch_later
              </i>
              Watch later
            </Link>
          </>
        )
      }

      <Link
        className='ml-menu-link'
        to='/settings'
      >
        <i className='material-icons ml-menu-icons'>
          settings
        </i>
        Settings
      </Link>

      <div
        className='ml-menu-link'
        onClick={loggedIn ? logout : login}
      >
        <i className='material-icons ml-menu-icons'>
          person
        </i>
        { loggedIn ? 'Logout' : 'Login' }
      </div>
    </div>
  );
};

export default Menu;
