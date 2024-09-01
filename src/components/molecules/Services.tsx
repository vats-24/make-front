import { ToggleGroup, ToggleGroupItem } from "@/components/atoms/ui/toggle-group";
import { Service } from "@/constants/Service";
import { useState } from "react";

interface ServicesProps {
  setData: (data: (prevData: any) => any) => void;
}

const Services: React.FC<ServicesProps> = ({ setData }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleChange = (service: string) => {
    let updatedServices: string[];
    if (selectedServices.includes(service)) {
      updatedServices = selectedServices.filter((t) => t !== service);
    } else {
      updatedServices = [...selectedServices, service];
    }
    setSelectedServices(updatedServices);
    setData((prev) => ({ ...prev, serviceType: updatedServices }));
    console.log(updatedServices);
  };

  return (
    <div>
      <ToggleGroup type="multiple" variant="outline" className="flex">
        <div className="grid grid-cols-2 gap-6 w-full">
          {Service.map((service, index) => (
            <ToggleGroupItem
              key={index}
              aria-checked={selectedServices.includes(service)}
              onClick={() => handleChange(service)}
              value={service}
              className=""
            >
              {service}
            </ToggleGroupItem>
          ))}
        </div>
      </ToggleGroup>
    </div>
  );
};

export default Services;
