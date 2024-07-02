import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { fetchAllUsers, updateUserData } from "../apis/userApi";
import { User } from "@/types";

interface UserState {
	user: string | null;
	userList: User[];
	loading: boolean;
	error: string | null;
}

const initialState: UserState = {
	user: null,
	userList: [],
	loading: false,
	error: null,
};

export const loginUser = createAsyncThunk(
	"user/loginUser",
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const token = await userCredential.user.getIdToken();
			localStorage.setItem("token", token);
			return { user: userCredential.user.email, token };
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const logoutUser = createAsyncThunk(
	"user/logoutUser",
	async (_, { rejectWithValue }) => {
		try {
			await signOut(auth);
			localStorage.removeItem("token");
			return null;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const fetchUsers = createAsyncThunk(
	"user/fetchUsers",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetchAllUsers();
			return response;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const updateUser = createAsyncThunk(
	"user/updateUser",
	async (userData: User, { rejectWithValue }) => {
		try {
			const response = await updateUserData(userData);
			return response;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<any>) {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.loading = false;
				state.user = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.userList = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(updateUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.loading = false;
				const updatedUser = action.payload;
				state.userList = state.userList.map((user) =>
					user.id === updatedUser.id ? updatedUser : user
				);
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
