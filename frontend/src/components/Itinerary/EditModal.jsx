import React from "react";
import BaseForm from "../common/form/BaseForm";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { updateItinerarySchema } from "./formSchema/formSchema";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSubmit } from "react-router-dom";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";

const EditPopUp = () => {
	const submit = useSubmit();
	const hookFormObj = {
		defaultValues: {
			title: "",
			country: "",
			budget: "",
		},
		resolver: yupResolver(updateItinerarySchema),
	};
	const onSubmit = (values) => {
		submit(values, { method: "post" });
	};
	const formProps = {
		className: "space-y-8",
		method: "post",
	};
	return (
		<>
			<Dialog>
				<DialogTrigger>Edit</DialogTrigger>
				<DialogContent className="sm:max-w-md">
					<BaseForm
						title={"Edit Itinerary"}
						hookFormObj={hookFormObj}
						onSubmit={onSubmit}
						formProps={formProps}
					>
						{(form) => (
							<>
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input
													placeholder="title"
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
									name="country"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Country</FormLabel>
											<FormControl>
												<Input
													placeholder="country"
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
									name="budget"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Budget</FormLabel>
											<FormControl>
												<Input
													placeholder="budget"
													type="text"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
					</BaseForm>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default EditPopUp;
