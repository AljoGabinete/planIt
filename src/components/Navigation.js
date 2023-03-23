import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <div>
      <div className='planIt'>PlanIt</div>
      <div className='navBtn'>
        <NavLink to={'/'} activeclassname='active'>
          <button>Dashboard</button>
        </NavLink>
        <NavLink to={'/Calendar'} activeclassname='active'>
          <button>Calendar</button>
        </NavLink>
        {/* <NavLink to={'/Blog'} activeclassname='active'>
        <button>Blog</button>
      </NavLink> */}
      </div>
    </div>
  );
}

export default Navigation;
