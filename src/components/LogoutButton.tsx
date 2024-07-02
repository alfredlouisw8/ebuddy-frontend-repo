"use client";

import { useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/userSlice";
import { Button } from "@mui/material";

const LogoutButton = () => {
	const dispatch = useAppDispatch();
	const handleLogout = () => {
		dispatch(logoutUser());
	};
	return (
		<Button variant="contained" onClick={handleLogout} sx={{ mb: 5 }}>
			Logout
		</Button>
	);
};

export default LogoutButton;
