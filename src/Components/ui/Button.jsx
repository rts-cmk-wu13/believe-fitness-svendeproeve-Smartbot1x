export function LoginButton({ children, ...props }) {
  return (
    <button
      className="big_bttn mt-5bg-green-400 disabled:bg-gray-400 disabled:cursor-not-allowed"
      {...props}
    >
      {children}
    </button>
  );
}
