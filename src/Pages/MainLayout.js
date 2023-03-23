import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

function MainLayout() {
  return (
    <div className='app'>
      <aside>
        <Navigation />
      </aside>
      <section>
        <Outlet />
      </section>
    </div>
  );
}

export default MainLayout;
