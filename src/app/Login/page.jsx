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
        <h2 className=" heading_form mb-7 ml-7">Log in with your credentials</h2>
      <LoginForm  />
    </AuthLayout>
    <article>
        <p className="text-[#9E9E9E] text-center  text-[14px] not-italic font-normal leading-[160%]">
         Are You not yet a Believer? <br />
          <span className="text-[#9E9E9E] text-[14px] not-italic font-normal leading-[160%]">
            <Link href="/Signup" className="text-[#9E9E9E] text-[14px] not-italic font-normal leading-[160%] underline decoration-solid underline-offset-auto ">
              {" "}
              Sign up here
            </Link> 
            <span className="">&nbsp;to start training like a pro. </span>
          </span>
        </p>
      </article>
      </>
    
  );
}
