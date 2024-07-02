"use client";

import React, { useEffect, useState } from "react";
import { AppState } from "../store/store";
import { fetchUsers, updateUser } from "../store/userSlice";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { User } from "@/types";
import EditUserModal from "./EditUserModal";
import LogoutButton from "./LogoutButton";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

const UserList = () => {
	const dispatch = useAppDispatch();
	const { userList, loading, error, user } = useAppSelector(
		(state: AppState) => state.user
	);

	useAuth();

	const [open, setOpen] = useState(false);
	const [currentUser, setCurrentUser] = useState<User>({
		id: "",
		name: "",
		address: "",
	});

	const handleOpen = (user: User) => {
		setCurrentUser(user);
		setOpen(true);
	};

	const handleClose = () => setOpen(false);

	const handleUpdate = () => {
		dispatch(updateUser(currentUser));
		handleClose();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCurrentUser({ ...currentUser, [name]: value });
	};

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	return (
		<Container>
			{user ? (
				<LogoutButton />
			) : (
				<Link href="/login">
					<Button variant="contained" sx={{ mb: 5 }}>
						Login
					</Button>
				</Link>
			)}
			<Typography variant="h6" gutterBottom>
				User List
			</Typography>

			{loading && <Typography>Loading...</Typography>}
			{error && <Typography color="error">{error}</Typography>}
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Address</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{userList.map((user) => (
							<TableRow key={user.id}>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.address}</TableCell>
								<TableCell>
									<Button
										variant="contained"
										color="primary"
										onClick={() => handleOpen(user)}
									>
										Update
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<EditUserModal
				open={open}
				onClose={handleClose}
				user={currentUser}
				onChange={handleChange}
				onUpdate={handleUpdate}
			/>
		</Container>
	);
};

export default UserList;
