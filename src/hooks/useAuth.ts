import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { setUser } from "@/store/userSlice";
import { useAppDispatch } from "@/store/hooks";

const useAuth = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				user.getIdToken().then((token) => {
					localStorage.setItem("token", token);
					dispatch(setUser(user.email));
				});
			} else {
				localStorage.removeItem("token");
				dispatch(setUser(null));
			}
		});

		return () => unsubscribe();
	}, [dispatch]);
};

export default useAuth;
