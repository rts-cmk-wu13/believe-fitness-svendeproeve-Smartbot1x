"use client";
import { signupUser } from "./action";
import { useActionState } from "react";

export default function CreateUserForm() {
  const [state, formAction] = useActionState(signupUser, {
    values: {},
    errors: {},
  });

  return (
    <div className="mx-auto w-full max-w-xl px-6 py-10">
      <h1 className="heading_form mb-7 ml-7">
        Sign up as a new user
      </h1>

      <form
        action={formAction}
        className="form_container"
      >
        
      <div>
       <input
    name="fullName"
    placeholder="Enter your name..."
    defaultValue={state.values?.fullName}
    className="base_input"
/>
          {state.errors?.fullName && (
            <p className="error_message ">
              {state.errors.fullName[0]}
            </p>
          )}
        </div>


        {/* Last Name */}
{/*         <div>
      <input
    name="lastName"
    placeholder="Enter your last name..."
    defaultValue={state.values?.lastName}
    className="base_input"
/>
          {state.errors?.lastName && (
            <p className="error_message ">
              {state.errors.lastName[0]}
            </p>
          )}
        </div> */}

        {/* Username */}
        <div>
          <input
            name="username"
            defaultValue={state.values?.username}
            placeholder="Enter your Username..."
            autoComplete="username"
            className="base_input"
          />
          {state.errors?.username && (
            <p className="error_message ">
              {state.errors.username[0]}
            </p>
          )}
        </div>

       

        {/* Password */}
        <div>
          <input
            name="password"
            type="password"
            placeholder="Enter your password..."
            autoComplete="new-password"
            className="base_input"
          />
          {state.errors?.password && (
            <p className="error_message ">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Repeat your password..."
            className="base_input "
          />
          {state.errors?.confirmPassword && (
            <p className="error_message ">
              {state.errors.confirmPassword[0]}
            </p>
          )}
        </div>

        
        <div className="pt-3 sm:pt-4">
          <button
            type="submit"
            className="big_bttn "
          >
            
            <span className="">Sign Up</span>
          </button>

          {state.errors?.form && (
            <p className="error_message ">
              {state.errors.form[0]}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
