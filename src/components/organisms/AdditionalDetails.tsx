import React from "react";
import additional from "../../assets/Additional.svg";
import Topics from "../molecules/Topics";
import { Button } from "../atoms/ui/button";
import ProgressBar from "../molecules/ProgressBar";
import ImageSection from "../molecules/ImageSection";

interface AdditionalDetailsProps {
  setData: React.Dispatch<React.SetStateAction<any>>;
  selectedStep: number;
  setSelectedStep: React.Dispatch<React.SetStateAction<number>>;
}

const AdditionalDetails: React.FC<AdditionalDetailsProps> = ({
  setData,
  selectedStep,
  setSelectedStep,
}) => {
  return (
    <div className="flex w-full h-screen">
      <ImageSection src={additional} />
      <div className="flex md:w-1/2 w-full justify-center items-center">
        <div className="flex flex-col justify-center max-w-[460px] w-2/3 h-[596px] gap-7">
          <div className="flex items-center justify-center mb-10">
            <ProgressBar step={selectedStep} />
          </div>
          <div>
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
              Additional Details
            </h1>
            <p className="text-[18px] font-light">
              Add some services/topics of your expertise
            </p>
          </div>
          <Topics setData={setData} topics={[]} />
          <Button onClick={() => setSelectedStep(2)}>Next</Button>
        </div>
        <p className="absolute bottom-8 font-thin text-[16px]">
          ©2024 ALL RIGHTS RESERVED DELTA FACTOR PVT LTD
        </p>
      </div>
    </div>
  );
};

export default AdditionalDetails;
