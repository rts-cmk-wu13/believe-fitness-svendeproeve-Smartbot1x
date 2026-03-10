
export default function AuthLayout({  children }) {
  return (
    <>
      <section className="  ">
        <h1 className="text-Uranium text-[56px] mt-19.5  ">Believe Fitness  </h1>
          <span className="flex items-center">  <hr className="w-7.75 text-black"/>  Train like a pro  </span>      
      </section>
      
    
      {children}
    </>
  );
}
