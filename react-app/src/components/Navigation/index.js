// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import './Navigation.css';

// function Navigation({ isLoaded }){
// 	const sessionUser = useSelector(state => state.session.user);

// 	return (
// 		<div className='nav-bar'>
// 			<span>
// 				<NavLink to="/">
// 					<div className='vapor-title'>
// 						<img
// 							className='vapor-logo'
// 							src='https://cdn.discordapp.com/attachments/880221705191161867/1159271530044342353/Vapor_Logo_1.png?ex=65306abe&is=651df5be&hm=34a5f13a1414a99f989c99f610e9f417a23391d416b1ad9d715cbe57714b9063&'
// 							alt="Vapor Logo"
// 						/>
// 						<h2>VAPOR</h2>
// 					</div>
// 				</NavLink>
// 			</span>
// 			<span>
// 				<NavLink exact to="/store">Store</NavLink>
// 			</span>
// 			<span>
// 				<NavLink exact to='/wishlist'>Wishlist</NavLink>
// 			</span>
// 			{/* <span className="tooltip">
// 				<span>Wish-List</span>
// 				<div className="tooltiptext">Coming Soon</div>
// 			</span> */}
// 				<span className="tooltip">
// 			<span>Library</span>
// 				<div className="tooltiptext">Coming Soon</div>
// 			</span>
// 			{isLoaded && (
// 				<span>
// 					<ProfileButton user={sessionUser} />
// 				</span>
// 			)}
// 		</div>
// 	);
// }

// export default Navigation;
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
				<NavLink to="/">
					<div className='vapor-title'>
						<img
							className='vapor-logo'
							src='https://cdn.discordapp.com/attachments/880221705191161867/1159271530044342353/Vapor_Logo_1.png?ex=65306abe&is=651df5be&hm=34a5f13a1414a99f989c99f610e9f417a23391d416b1ad9d715cbe57714b9063&'
							alt="Vapor Logo"
						/>
						<h2>VAPOR</h2>
					</div>
				</NavLink>
			</span>
			<span>
				<NavLink exact to="/store">Store</NavLink>
			</span>
			{sessionUser ? (
				<span>
					<NavLink exact to='/wishlist'>Wishlist</NavLink>
				</span>
			) : (
				<span className="tooltip">
					<span>Wishlist</span>
					<div className="tooltiptext">Login to access your wishlist</div>
				</span>
			)}
			<span className="tooltip">
				<span>Library</span>
				<div className="tooltiptext">Coming Soon</div>
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
