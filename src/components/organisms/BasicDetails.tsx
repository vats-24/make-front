import React from "react";
import Basic from "../../assets/Basic.svg";
import Details from "../molecules/Details/Details";
import ProgressBar from "../molecules/ProgressBar";

interface BasicDetailsProps {
  setData: React.Dispatch<React.SetStateAction<any>>;
  selectedStep: number;
  setSelectedStep: React.Dispatch<React.SetStateAction<number>>;
}

const BasicDetails: React.FC<BasicDetailsProps> = ({ setData, selectedStep, setSelectedStep }) => {
  return (
    <div className="flex w-full h-screen">
      <div className="flex md:w-1/2 justify-center items-center">
        <div className="md:block hidden">
          <img src={Basic} alt="lets" className="md:block hidden" />
        </div>
      </div>
      <div className="flex flex-col border md:w-1/2 w-full justify-center items-center">
        <div className="flex flex-col justify-center max-w-[460px] w-2/3 h-[596px] gap-y-7">
          <div className="flex items-center justify-center mb-10">
            <ProgressBar step={selectedStep} />
          </div>
          <div>
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
              Basic Details
            </h1>
            <p className="text-[18px] font-light">Please provide your details</p>
          </div>
          <Details selectedStep={selectedStep} setSelectedStep={setSelectedStep} setData={setData} />
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
