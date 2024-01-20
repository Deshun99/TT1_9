import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/common/layout/Layout";
import AuthLayout from "./components/common/layout/AuthLayout";
import SignInForm from "./components/auth/SignInForm";
import SignUpForm from "./components/auth/SignUpForm";
import { AuthApi } from "./lib/api/authApi";
import { AuthService } from "./lib/service/authService";
import { redirect } from "react-router-dom";
import Itinerary from "./components/Itinerary/Itinerary";
import { ItineraryApi } from "./lib/api/ItineraryApi";
function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			// loader: () => (AuthService.checkAuth() ? null : redirect("/auth/signin")),
			element: <Layout />,
			id: "root",
			children: [
				{
					path: "itinerary",
					element: <Itinerary />,
					action: ({ params, request }) => {
						const { method } = request;
						
					},
				},
			],
		},
		{
			path: "/auth",
			element: <AuthLayout />,
			// loader: () => (AuthService.checkAuth() ? redirect("/") : null),
			id: "auth",
			children: [
				{
					path: "signin",
					element: <SignInForm />,
					action: AuthApi.signIn,
				},
				{
					path: "signup",
					element: <SignUpForm />,
					action: AuthApi.signUp,
				},
			],
		},
	]);
	return <RouterProvider router={router} />;
}

export default App;
