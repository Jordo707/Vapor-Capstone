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
				<h2>VAPOR</h2>
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
