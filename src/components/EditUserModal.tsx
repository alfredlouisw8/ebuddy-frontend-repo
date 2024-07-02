"use client";

import React, { ChangeEvent } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { User } from "@/types";

interface EditUserModalProps {
	open: boolean;
	onClose: () => void;
	user: User;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onUpdate: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
	open,
	onClose,
	user,
	onChange,
	onUpdate,
}) => {
	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 400,
					bgcolor: "background.paper",
					border: "2px solid #000",
					boxShadow: 24,
					p: 4,
				}}
			>
				<Typography variant="h6" component="h2">
					Edit User
				</Typography>
				<TextField
					margin="normal"
					fullWidth
					label="Name"
					name="name"
					value={user.name}
					onChange={onChange}
				/>
				<TextField
					margin="normal"
					fullWidth
					label="Address"
					name="address"
					value={user.address}
					onChange={onChange}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={onUpdate}
					sx={{ mt: 2 }}
				>
					Update
				</Button>
			</Box>
		</Modal>
	);
};

export default EditUserModal;
