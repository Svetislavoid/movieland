import React, { useEffect } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

// components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';

// styles
import '@/App.css';

// services
import { getConfiguration } from '@/services';

const App = () => {
  useEffect(() => {
    getConfiguration()
      .then((r) => r);
  }, []);

  return (
    <div className='ml-app'>
      <Header />
      <div className='ml-main-content'>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
