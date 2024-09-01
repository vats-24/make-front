import { useState, ChangeEvent } from "react";
import { Label } from "../atoms/ui/label";
import { Input } from "../atoms/ui/input";
import { Textarea } from "../atoms/ui/textarea";
import { Button } from "../atoms/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

interface CreateServiceProps {
  setData: (data: any) => void;
  setSelectedStep: (step: number) => void;
}

interface ServiceDetail {
  title: string;
  shortDescription: string;
  description: string;
  duration: number;
  amount: number;
}

const CreateService: React.FC<CreateServiceProps> = ({ setData, setSelectedStep }) => {
  const [serviceDetail, setServiceDetail] = useState<ServiceDetail>({
    title: "",
    shortDescription: "",
    description: "",
    duration: 0,
    amount: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setServiceDetail({ ...serviceDetail, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    setData(serviceDetail);
    setSelectedStep(2);
  };

  return (
    <div className="h-screen flex flex-col p-8 gap-5">
      <div className="flex-[0.1] flex items-center justify-between p-1">
        <div className="flex items-center gap-4">
          <ArrowLeftIcon
            height={"32"}
            width={"32"}
            onClick={() => setSelectedStep(0)}
            className="cursor-pointer"
          />
          <h1 className="text-4xl font-semibold">What are you creating today?</h1>
        </div>
        <Button className="bg-[#6425FE]" onClick={() => setSelectedStep(1)}>
          Save Changes
        </Button>
      </div>

      <div className="p-6 bg-white rounded-md gap-4 flex flex-col w-[40%]">
        <div className="space-y-4">
          <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">Basic Details</h1>
          <p className="text-[18px] font-light">Please provide some basic details about this session</p>
        </div>
        <div className="flex flex-col gap-[32px]">
          <form onSubmit={handleNext} className="flex flex-col gap-[32px]">
            <div>
              <Label>Title</Label>
              <Input
                value={serviceDetail.title}
                onChange={handleChange}
                name="title"
                className="h-[48px]"
                required
              />
            </div>
            <div>
              <Label>Short Description</Label>
              <Input
                value={serviceDetail.shortDescription}
                onChange={handleChange}
                name="shortDescription"
                className="h-[48px]"
                required
              />
            </div>
            <div>
              <Label>Long Description(Optional)</Label>
              <Textarea
                value={serviceDetail.description}
                onChange={handleChange}
                name="description"
                className="h-[78px]"
              />
            </div>
            <div>
              <Label>Duration(mins)</Label>
              <Input
                value={serviceDetail.duration}
                onChange={handleChange}
                name="duration"
                type="number"
                className="h-[48px]"
                required
              />
            </div>
            <div>
              <Label>Pricing (INR)</Label>
              <Input
                value={serviceDetail.amount}
                onChange={handleChange}
                name="amount"
                type="number"
                className="h-[48px]"
                required
              />
            </div>
            <Button className="bg-[#6425FE]" type="submit">
              Next
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateService;
