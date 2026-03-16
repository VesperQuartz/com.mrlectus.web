import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/(auth)/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex p-10">
			<form
				className="space-y-1"
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.target);
					const data = Object.fromEntries(formData);
					authClient.signIn.email(
						{
							email: data.email as string,
							password: data.password as string,
							callbackURL: "/",
						},
						{
							onError: (e) => {
								toast.error(`${e.error.message}`);
							},
						},
					);
					console.log(data);
				}}
			>
				<Input type="email" name="email" placeholder="email" />
				<Input type="password" name="password" placeholder="password" />
				<Button type="submit">Login</Button>
			</form>
		</div>
	);
}
