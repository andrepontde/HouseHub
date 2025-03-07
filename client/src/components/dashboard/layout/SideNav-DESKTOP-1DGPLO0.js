import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faStickyNote, faWrench, faCalendar } from '@fortawesome/free-solid-svg-icons';
import 'styles/sidebar-nav.css'


const Sidebar = () => {
    return (
        <nav className="sidebar">
            <ul>
                <li>
                    <Link to="/dashboard">
                        <FontAwesomeIcon icon={faChartLine} /> <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/memos">
                        <FontAwesomeIcon icon={faStickyNote} /> <span>Memos</span>
                    </Link>
                </li>
                <li>
                    <Link to="/utility">
                        <FontAwesomeIcon icon={faWrench} /> <span>Utility</span>
                    </Link>
                </li>
                <li>
                    <Link to="/calendar">
                        <FontAwesomeIcon  icon={faCalendar} /> <span>Calendar</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
