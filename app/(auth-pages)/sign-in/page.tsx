import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ShinyButton from "@/components/ui/shiny-button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <>
      <Link href={"/"} className="top-4 left-4 absolute">
        <Button variant={"comic"} className="py-2">
          <ArrowLeft /> <span>Back</span>
        </Button>
      </Link>
      <div className="flex justify-center items-center bg-background w-full h-[100vh]">
        <div className="flex dark:border-white p-4 border-t-2 border-r-8 border-b-8 border-black border-l-2 rounded-3xl">
          <form className="flex flex-col flex-1 justify-center mx-auto min-w-64 max-w-64">
            <h1 className="font-medium text-2xl">Sign in</h1>
            <p className="text-foreground text-sm">
              Don't have an account?{" "}
              <Link
                className="font-medium text-foreground underline"
                href="/sign-up"
              >
                Sign up
              </Link>
            </p>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="you@example.com" required />
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  className="text-foreground text-xs underline"
                  href="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                type="password"
                name="password"
                placeholder="Your password"
                required
              />
              <SubmitButton
                pendingText="Signing In..."
                formAction={signInAction}
              >
                Sign in
              </SubmitButton>
              <FormMessage message={searchParams} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
