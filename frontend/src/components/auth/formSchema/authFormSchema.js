import * as Yup from "yup";

export const signInFormSchema = Yup.object({
	username: Yup.string().trim().required("Please provide a Username"),
	password: Yup.string()
		.trim()
		.min(6, "Password must be at least 6 characters")
		.max(20, "Password must be less than 20 characters")
		.required("Please provide a Password"),
});

export const signUpFormSchema = Yup.object({
	name: Yup.string().trim().required("Please provide a Name"),
	username: Yup.string().trim().required("Please provide a Username"),
	email: Yup.string()
		.trim()
		.email("Please provide a valid E-mail")
		.required("Please provide an E-mail"),
	password: Yup.string()
		.trim()
		.min(6, "Password must be at least 6 characters")
		.required("Please provide a Password"),
	phoneNum: Yup.string().trim().required("Please provide a Phone Number"),
});
