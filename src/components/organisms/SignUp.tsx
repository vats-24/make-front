import { InputForm } from "../molecules/Auth/Form";
import letsStart from "../../assets/lets-start.svg";
import google from "../../assets/continue.svg";
const SignUp = () => {
  return (
    <div className="flex w-full h-screen">
      <div className="flex md:w-1/2 justify-center items-center">
        <div className="md:block hidden">
          <img src={letsStart} alt="lets" className="md:block hidden" />
        </div>
      </div>
      <div className="flex md:w-1/2 w-full justify-center items-center">
        <div className="flex flex-col justify-center max-w-[460px] w-2/3 h-[596px] gap-y-7">
          <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Lets get started
          </h1>
          <InputForm/>
          <div className="flex flex-col gap-3 items-center">
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <img src={google} alt="google" onClick={() => console.log("hi")} />
            <h3>
              Already a member?{" "}
              <a href="/login" className="underline">
                Login
              </a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
