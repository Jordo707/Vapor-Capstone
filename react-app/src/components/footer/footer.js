import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import './footer.css'

function Footer({isLoaded}) {
    return (
        <footer className="footer">
            <div className="footer-content">
                <span className='footer-legal'>

                <p>&copy; {new Date().getFullYear()} Vapor Incorperated. No real rights reserved, just be creative if you appropriate any of the code. Vapor is a clone created by Jordan Pentti of the Steam application which is the property of Valve Corperation.</p>
                <img
                    className='vapor-footer-logo'
                    src='https://cdn.discordapp.com/attachments/880221705191161867/1159271530044342353/Vapor_Logo_1.png?ex=65306abe&is=651df5be&hm=34a5f13a1414a99f989c99f610e9f417a23391d416b1ad9d715cbe57714b9063&'
					alt="Vapor Logo"
                    />
                </span>
                <div className="footer-icons">
                    <a href="https://www.linkedin.com/in/jordan-pentti-4b0044138/" target="_blank" rel="noreferrer">
                    <i className="fab fa-linkedin"> LinkedIn</i>
                    </a>
                    <a href="https://github.com/Jordo707" target="_blank" rel="noreferrer">
                    <i className="fab fa-github"> GitHub</i>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
