import "./SignInForm.css";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import BaseForm from "../common/form/BaseForm";
import {
	Link,
	useNavigation,
	useSearchParams,
	useSubmit,
} from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription } from "../ui/alert";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signInFormSchema } from "./formSchema/authFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const SignInForm = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	//Login expiry error display
	const [searchParams] = useSearchParams();
	const isLoginExpired = searchParams.get("status") === "expired";

	const submit = useSubmit();
	const hookFormObj = {
		defaultValues: {
			username: "",
			password: "",
		},
		resolver: yupResolver(signInFormSchema),
	};
	const onSubmit = (values) => {
		submit(values, { method: "post" });
	};
	const formProps = {
		className: "space-y-8",
		method: "post",
	};
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl text-center">Sign In</CardTitle>
			</CardHeader>
			<CardContent>
				<BaseForm
					title={"Sign In"}
					hookFormObj={hookFormObj}
					onSubmit={onSubmit}
					formProps={formProps}
				>
					{(form) => (
						<>
							{isLoginExpired && (
								<Alert variant="danger">
									<AlertDescription>
										Login expired, please proceed to
										re-login again
									</AlertDescription>
								</Alert>
							)}
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input
												placeholder="username"
												type="text"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder="password"
												type="password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? (
									<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
								) : (
									"Login"
								)}
							</Button>
							{/* <button type="button" onClick={handleForgotPassword}>
        Forgot Password
      </button> */}
						</>
					)}
				</BaseForm>
			</CardContent>
			<CardFooter className="">
				<div className="mx-auto">
					If you do not have an account, proceed to{" "}
					<Button variant="link" className="p-0 text-center" asChild>
						<Link to="/auth/signup">Sign Up</Link>
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

export default SignInForm;
