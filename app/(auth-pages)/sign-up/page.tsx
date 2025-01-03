import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

/**
 * The sign up page.
 *
 * This page displays a form that allows a user to sign up to the app with
 * their name, email, and password. The form also includes a link to sign in
 * if the user already has an account and a link to reset their password if
 * they have forgotten it. The page also displays a message if the user's
 * sign up attempt fails.
 *
 * The page is also responsible for displaying a message if the user is
 * redirected to the page with a message query parameter. For example, if
 * the user is redirected to the page with the query parameter
 * `?message=Account+created.+Check+your+email+for+a+verification+link.`,
 * the page will display the message "Account created. Check your email for a
 * verification link."
 */
export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="flex flex-1 justify-center items-center gap-2 p-4 w-full sm:max-w-md h-screen">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <Link href={"/"} className="top-4 left-4 absolute">
        <Button variant={"comic"} className="py-2">
          <ArrowLeft /> <span>Back</span>
        </Button>
      </Link>
      <div className="flex justify-center items-center w-full h-[100vh]">
        <div className="flex dark:border-white p-4 border-t-2 border-r-8 border-b-8 border-black border-l-2 rounded-3xl">
          <form className="flex flex-col mx-auto min-w-64 max-w-64">
            <h1 className="font-medium text-2xl">Sign up</h1>
            <p className="text-foreground text-sm text">
              Already have an account?{" "}
              <Link
                className="font-medium text-primary underline"
                href="/sign-in"
              >
                Sign in
              </Link>
            </p>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
              <Label htmlFor="name">Name</Label>
              <Input name="name" placeholder="John Doe" required />
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="you@example.com" required />
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Your password"
                minLength={6}
                required
              />
              <SubmitButton
                formAction={signUpAction}
                pendingText="Signing up..."
              >
                Sign up
              </SubmitButton>
              <FormMessage message={searchParams} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
