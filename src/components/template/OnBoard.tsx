import React, { useState } from "react";
import BasicDetails from "../organisms/BasicDetails";
import AdditionalDetails from "../organisms/AdditionalDetails";
import SetAvailability from "../organisms/SetAvailability";

const OnBoard = () => {
  const [selectedStep, setSelectedStep] = React.useState(0);
  const [data, setData] = useState({});
  return (
    <div>
      {selectedStep === 0 ? (
        <BasicDetails
          setData={setData}
          selectedStep={selectedStep}
          setSelectedStep={setSelectedStep}
        />
      ) : selectedStep === 1 ? (
        <>
          <AdditionalDetails
          setData={setData}
            selectedStep={selectedStep}
            setSelectedStep={setSelectedStep}
          />
        </>
      ) : selectedStep === 2 ? (
        <SetAvailability data={data} setData={setData} selectedStep={selectedStep} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default OnBoard;
