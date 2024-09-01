import letsStart from "../../assets/lets-start.svg";
import google from "../../assets/google.svg";


const SignIn = () => {

  const handleGoogle = async() => {
    window.location.href = 'http://localhost:3000/api/users/google/users';
  }
  
  return (
    <div className="flex w-full h-screen container">
      <div className="flex md:w-1/2 justify-center items-center">
        <div className="md:block hidden">
          <img src={letsStart} alt="lets" className="md:block hidden" />
        </div>
      </div>
      <div className="flex md:w-1/2 w-full justify-center items-center">
        <div className="flex flex-col justify-center max-w-[460px] w-2/3 h-[596px] gap-7">
          <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Welcome Back
          </h1>
          {/* <LoginForm /> */}
          <div className="flex flex-col gap-3 items-center h-12">
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <img src={google} alt="google" onClick={handleGoogle} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
