import { Button } from "../atoms/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { toast } from "react-hot-toast";
import Services from "./Services";
import useCreateService from "@/queries/services/use-create-service";
import { queryClient } from "@/react-query/client";

interface ServiceDetailProps {
  data: any;
  setData: (data: any) => void;
  setSelectedStep: (step: number) => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ data, setData, setSelectedStep }) => {
  const createServiceMutation = useCreateService();

  const handleSave = async () => {
    createServiceMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["all-services"] });
        toast.success(
          "You have successfully created a new service. It's time to share this to your network"
        );
      },
      onError: () => {
        toast.error(
          "There was some error creating your service. Please try again"
        );
      }
    });
    setSelectedStep(0);
  };

  return (
    <div className="h-screen flex flex-col p-8 gap-8">
      <div className="flex flex-row items-center gap-12 p-1">
        <ArrowLeftIcon
          height={32}
          width={32}
          onClick={() => setSelectedStep(1)}
          className="cursor-pointer"
        />
        <h1 className="text-3xl font-semibold">What Are You Creating Today?</h1>
      </div>
      <div className="flex flex-col gap-8 w-[30%]">
        <div>
          <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Additional Details
          </h1>
          <p className="text-[18px] font-light">
            Please choose the session type
          </p>
        </div>
        <Services setData={setData} />
        <Button className="bg-[#6425FE]" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default ServiceDetail;
