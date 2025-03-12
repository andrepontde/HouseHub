import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from 'axios';
import { Container, Box, Button } from "@mui/material"; // Import Button
import TheMainNavBar from "components/layout/MainNav";

// Import the card components to handle a tenant or landlord
import TenantCard from "../components/adminPage/TenantCard";
import LandlordCard from "../components/adminPage/LandlordCard";

const drawerWidth = 240; // Adjust based on your SideNav width

const AdminPage = () => {
	//Usernames are passed as a parameter in the URL
	const { username } = useParams();
	const navigate = useNavigate(); // Initialize useNavigate
	const [role, setRole] = useState('');
	//Usestate to store the role of the user
	const [loading, setLoading] = useState(true);

	//function to fetch the user role from the server when loading components
	useEffect(() => {
		const fetchUserRole = async () => {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.get(
					"http://localhost:5001/api/user/user",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				console.log(response.data.user.role);
				setRole(response.data.user.role);
			} catch (error) {
				console.error('Error fetching user role:', error);
			} finally {
				setLoading(false);
			}
		};

		if (localStorage.getItem('token')) {
			fetchUserRole();
		}
	}, [username]);

	if (loading) {
		return <Container><Box sx={{ mt: 4 }}>Loading...</Box></Container>;
	}

	//Render the TenantCard or LandlordCard based on the role of the user

	return (
		<Container maxWidth={false} disableGutters>
	<TheMainNavBar/>

		<Container>

			<Box sx={{ mt: 4 }}>
				{/* <Button variant="contained" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button> */}
				{role === 'tenant' ? (
					<TenantCard username={username} />
				) : role === 'landlord' ? (
					<LandlordCard username={username} />
				) : (
					<Box>No role assigned or invalid role.</Box>
				)}
			</Box>
		</Container>
		</Container>
	);
};

export default AdminPage;
