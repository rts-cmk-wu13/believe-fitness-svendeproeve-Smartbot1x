import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/Components/loginForm/LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Log in",
  description: "Log in to your Believe fitness account",
};
export default function Login() {    
  return (
  <>
    <AuthLayout >
        <h2 className="">Log in with your credentials</h2>
      <LoginForm  />
    </AuthLayout>
    <article>
        <p className="">
         Are You not yet a Believer? {" "}
          <span>
            <Link href="/Signup" className="underline">
              {" "}
              Sign up here
            </Link> 
            <span className="">to start training like a pro. </span>
          </span>
        </p>
      </article>
      </>
    
  );
}
