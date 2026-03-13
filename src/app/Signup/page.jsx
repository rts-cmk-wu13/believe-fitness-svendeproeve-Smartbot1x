import AuthLayout from "@/Components/auth/AuthLayout";
import CreateUserForm from "@/Components/signupform/CreateUserForm";

export default function Signup() {
    return (
        <>
         <AuthLayout>
      <CreateUserForm />
    </AuthLayout>
        </>
        
    );
}