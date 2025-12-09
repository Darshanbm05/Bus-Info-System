import React, { useState } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import TimeTable from './components/TimeTable';
import Admin from './components/Admin';
import ContactUs from './components/ContactUs';
import './styles.css';

export default function App() {
  const [route, setRoute] = useState('home');
  return (
    <div>
      <Nav route={route} onNavigate={setRoute} />
      <div className="container">
        {route === 'home' && <Home />}
        {route === 'timetable' && <TimeTable />}
        {route === 'contactus' && <ContactUs />}
        {route === 'admin' && <Admin />}
      </div>
    </div>
  );
}
