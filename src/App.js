import React from 'react';

// components
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// styles
import '@/App.css';

const App = () => {
  return (
    <div className='ml-app'>
      <Header />
      <div className='ml-main-content'>
      </div>
      <Footer />
    </div>
  );
};

export default App;
