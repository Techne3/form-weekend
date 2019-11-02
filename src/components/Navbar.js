import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav>
			<div class="container">
				<div class="nav-wrapper">
					<Link to="/" class="brand-logo">
						React Form
					</Link>
					<ul id="nav-mobile" class="right hide-on-med-and-down">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About </Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
