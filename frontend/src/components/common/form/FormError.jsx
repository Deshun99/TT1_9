import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const FormError = ({ errorMsg, title }) => {
	return (
		<>
			{errorMsg && Object.keys(errorMsg).length !== 0 && (
				<Alert variant="destructive">
					<ExclamationTriangleIcon className="h-4 w-4" />
					<AlertTitle>{title}</AlertTitle>
					<AlertDescription>
						<ul>
							{Object.entries(errorMsg).map(([k, v]) => {
								return <li key={k}>{v}</li>;
							})}
						</ul>
					</AlertDescription>
				</Alert>
			)}
		</>
	);
};

export default FormError;
