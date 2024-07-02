import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import StoreProvider from "./StoreProvider";
import useAuth from "@/hooks/useAuth";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<StoreProvider>
					<AppRouterCacheProvider>
						<ThemeProvider theme={theme}>
							<CssBaseline />
							{children}
						</ThemeProvider>
					</AppRouterCacheProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
