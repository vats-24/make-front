import React from "react";
import Availability from "@assets/availability.svg";
import WeekdayTimePicker from "../molecules/Availability/TimePicker";
import ProgressBar from "../molecules/ProgressBar";

interface AvailabilityData {
  day: string;
  startTime: string;
  endTime: string;
}

interface SetAvailabilityProps {
  data: {};
  setData: React.Dispatch<React.SetStateAction<AvailabilityData[]>>;
  selectedStep: number;
}

const SetAvailability: React.FC<SetAvailabilityProps> = ({ data,setData,selectedStep }) => {
  return (
    <div className="flex w-full h-screen">
      <div className="flex md:w-1/2 justify-center items-center">
        <div className="md:block hidden">
          <img src={Availability} alt="lets" className="md:block hidden" />
        </div>
      </div>
      <div className="flex flex-col md:w-1/2 w-full justify-center items-center border">
        <div className="flex flex-col justify-center max-w-[460px] w-2/3 h-[596px] gap-y-7">
          <div className="flex items-center justify-center mb-10" >
            <ProgressBar step={selectedStep} />
          </div>
          <div>
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
              Select you Availability Time
            </h1>
            <p className="text-[18px] font-light">You can edit this later</p>
          </div>
          <div className="w-100">
            <WeekdayTimePicker data={data} setData={setData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetAvailability;
