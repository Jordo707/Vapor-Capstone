import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-bar'>
			<span>
				<div className='vapor-title'>
					<img className='vapor-logo' src='https://cdn.discordapp.com/attachments/880221705191161867/1159271530044342353/Vapor_Logo_1.png?ex=65306abe&is=651df5be&hm=34a5f13a1414a99f989c99f610e9f417a23391d416b1ad9d715cbe57714b9063&'></img>
					<h2>VAPOR</h2>
				</div>
			</span>
			<span>
				<NavLink exact to="/store">Store</NavLink>
			</span>
			<span>
				Wish-List
			</span>
			<span>
				Library
			</span>
			{isLoaded && (
				<span>
					<ProfileButton user={sessionUser} />
				</span>
			)}
		</div>
	);
}

export default Navigation;
