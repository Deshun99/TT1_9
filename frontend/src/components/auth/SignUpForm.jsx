import "./SignUpForm.css";
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
import { Link, useNavigation, useSubmit } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signUpFormSchema } from "./formSchema/authFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const SignUpForm = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	const submit = useSubmit();
	const hookFormObj = {
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
    },
    resolver: yupResolver(signUpFormSchema),
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
        <CardTitle className='text-2xl text-center'>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <BaseForm
          title={"Sign Up"}
          hookFormObj={hookFormObj}
          onSubmit={onSubmit}
          formProps={formProps}
        >
          {(form) => (
            <>
              <FormField
                control={form.control}
                name='first_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder='First Name' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='last_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Last Name' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='username' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='password'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? (
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  "Sign Up"
                )}
              </Button>
              {/* <button type="button" onClick={handleForgotPassword}>
Forgot Password
</button> */}
            </>
          )}
        </BaseForm>
      </CardContent>
      <CardFooter className=''>
        <div className='mx-auto'>
          Already have an account? Proceed to{" "}
          <Button variant='link' className='p-0 text-center' asChild>
            <Link to='/auth/signin'>Sign In</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
