import React from 'react';

export default function Nav({ route, onNavigate }) {
  return (
    <div className="nav">
      <div className="nav-brand">
        <i className="bi bi-bus-front"></i>
        KSRTC Bus System
      </div>
      <div style={{flex:1}} />
      <button 
        onClick={() => onNavigate('home')}
        style={{background: route === 'home' ? 'rgba(255,255,255,0.25)' : ''}}
      >
        <i className="bi bi-house-door"></i> Home
      </button>
      <button 
        onClick={() => onNavigate('timetable')}
        style={{background: route === 'timetable' ? 'rgba(255,255,255,0.25)' : ''}}
      >
        <i className="bi bi-calendar-event"></i> Time Table
      </button>
      <button 
        onClick={() => onNavigate('contactus')}
        style={{background: route === 'contactus' ? 'rgba(255,255,255,0.25)' : ''}}
      >
        <i className="bi bi-chat-dots"></i> Contact Us
      </button>
      <button 
        onClick={() => onNavigate('admin')}
        style={{background: route === 'admin' ? 'rgba(255,255,255,0.25)' : '', position: 'relative'}}
      >
        <i className="bi bi-shield-lock"></i> Admin
      </button>
    </div>
  );
}
