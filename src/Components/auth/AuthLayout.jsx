
export default function AuthLayout({  children }) {
  return (
    <>
      <section className=" flex flex-col gap-6 mx-2  ">
        <h1 className="text-Uranium text-[56px] mt-19.5 font-bold  leading-[100%] ">Believe Fitness  </h1>
          <span className="flex items-center text-[20px] font-bold leading-[120%] mb-10">  <hr className="w-7.75 text-black"/>  Train like a pro  </span>      
      </section>
      
    
      {children}
    </>
  );
}
