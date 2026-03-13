"use client";
import { useActionState } from "react";
import { loginUser } from "./action";
import { LoginButton } from "../ui/Button";


const initialState = {
  values: {
    email: "",
    password: "",
  },
  errors: undefined,
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginUser,
    initialState,
  );
  console.log(state);

  return (
    <form
      action={formAction}
      noValidate
      className="form_container "
    >
      <div>
        <input
          type="text"
          name="email"
          placeholder="Enter your email..."
          defaultValue={state.values.email}
          className="base_input"
        />
        {state.errors?.email && <p className="error_message ">{state.errors.email}</p>}
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Enter your password..."
          defaultValue={state.values.password}
          className="base_input"
        />
        {state.errors?.password && <p className="error_message">{state.errors.password}</p>}
      </div>
      {state.errors?.form && (
        <p className="error_message">{state.errors.form}</p>
      )}
      <LoginButton disabled={isPending} type="submit">
        {isPending ? "Logger ind..." : "Log ind"}
      </LoginButton>
    </form>
  );
}
