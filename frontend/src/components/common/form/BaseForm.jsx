import { useEffect } from "react";
import { useActionData, Form as RouterForm } from "react-router-dom";
import FormError from "./FormError";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
const BaseForm = ({ title, hookFormObj, onSubmit, formProps, children }) => {
	//form validation
	const form = useForm(hookFormObj);

	//response error handling
	const actionData = useActionData();
	useEffect(() => {
		if (actionData) {
            //Set any errors returned from server after submission
			const formWideErr = {};
			Object.entries(actionData.data).forEach(([k, v]) => {
				formWideErr[k] = v;
			});
			// form.setError(fieldErr);
			form.setError("root.serverError", {
				type: "404",
				message: formWideErr,
			});
		}
	}, [actionData, form]);

	return (
		<>
			{/* Error Message Display for errors returned from server */}
			{form.formState.isSubmitSuccessful && (
				<FormError
					errorMsg={form.formState.errors.root?.serverError?.message}
					title={title + " Error"}
				/>
			)}
			<Form {...form}>
				<RouterForm
					noValidate
					onSubmit={form.handleSubmit(onSubmit)}
					{...formProps}
				>
					{children(form)}
				</RouterForm>
			</Form>
		</>
	);
};

export default BaseForm;
