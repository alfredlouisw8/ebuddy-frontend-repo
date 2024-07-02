"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userSlice";
import { useRouter } from "next/navigation";
import { AppState, AppDispatch } from "../store/store";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const LoginForm = () => {
	const [email, setEmail] = useState("demo@gmail.com");
	const [password, setPassword] = useState("demouser");
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { loading, error } = useAppSelector((state: AppState) => state.user);

	const handleLogin = async () => {
		const result = await dispatch(loginUser({ email, password }));
		if (loginUser.fulfilled.match(result)) {
			router.push("/");
		}
	};

	return (
		<Container maxWidth="xs">
			<Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
				<Box display="flex" flexDirection="column" alignItems="center">
					<Typography variant="h4" gutterBottom>
						Login
					</Typography>
					<TextField
						label="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						margin="normal"
						fullWidth
					/>
					<TextField
						label="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						margin="normal"
						fullWidth
					/>
					{error && (
						<Typography color="error" variant="body2">
							{error}
						</Typography>
					)}
					<Button
						variant="contained"
						color="primary"
						onClick={handleLogin}
						fullWidth
						disabled={loading}
						sx={{ mt: 2 }}
					>
						{loading ? "Logging in..." : "Login"}
					</Button>
				</Box>
			</Paper>
		</Container>
	);
};

export default LoginForm;
