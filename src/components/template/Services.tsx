import { useState } from "react";
import CreateService from "../molecules/CreateService";
import ServiceDetail from "../molecules/ServiceDetail";
import ServiceList from "../molecules/ServiceCard";

const Services = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  const [data, setData] = useState("");
  return (
    <div>
      {selectedStep === 1 ? (
        <CreateService setData={setData} setSelectedStep={setSelectedStep} />
      ) : selectedStep === 2 ? (
        <ServiceDetail data={data} setData={setData} setSelectedStep={setSelectedStep} />
      ) : (
        <ServiceList setSelectedStep={setSelectedStep} />
      )}
    </div>
  );
};

export default Services;
