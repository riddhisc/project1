import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ type = 'staff' }) => {
  const adminLinks = [
    { to: '/admin/dashboard', icon: '📊', text: 'Dashboard' },
    { to: '/admin/events', icon: '📅', text: 'Events' },
    { to: '/admin/staff', icon: '👥', text: 'Staff Directory' },
    { to: '/admin/reports', icon: '📝', text: 'Reports' }
  ];
  
  const staffLinks = [
    { to: '/staff/dashboard', icon: '🏠', text: 'Dashboard' },
    { to: '/staff/my-events', icon: '📅', text: 'My Events' },
    { to: '/staff/networking', icon: '🤝', text: 'Networking' }
  ];
  
  const links = type === 'admin' ? adminLinks : staffLinks;
  
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink 
                to={link.to}
                className={({ isActive }) => 
                  isActive ? 'sidebar-link active' : 'sidebar-link'
                }
              >
                <span className="sidebar-icon">{link.icon}</span>
                <span className="sidebar-text">{link.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;