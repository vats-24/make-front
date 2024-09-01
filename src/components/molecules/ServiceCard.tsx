import { Key, useState } from "react";
import { Card } from "../atoms/ui/card";
import { Share1Icon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../atoms/ui/sheet";
import { Button } from "../atoms/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../atoms/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import useGetAllServices from "@/queries/services/use-get-services";
import { useUpdateService } from "@/queries/services/use-update-services";
import { queryClient } from "@/react-query/client";
import clock from "@assets/clock-gray.svg";
import rupee from "@assets/rupee-gray.svg";
import { SkeletonCard } from "./SkeltonCard";
import { saveAs } from "file-saver";
import useDeleteService from "@/queries/services/use-delete-service";

// Define the types for the props
interface ServiceListProps {
  setSelectedStep: (step: number) => void;
}

// Define the types for the service object
interface Service {
  services: {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    amount: string;
    duration: string;
    type: string;
  };
  totalBookings: number;
}

const ServiceList: React.FC<ServiceListProps> = ({ setSelectedStep }) => {
  const [edit, setEdit] = useState<string | null>(null);
  const [price, setPrice] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [svgContent, setSvgContent] = useState<string | undefined>();

  const { data: services = [], isLoading } = useGetAllServices();
  const updateServiceMutation = useUpdateService();
  const deleteServiceMutation = useDeleteService();

  const handleEdit = (service: Service) => {
    setEdit(service.services.id);
    setPrice(service.services.amount);
    setDuration(service.services.duration);
  };

  const handleDelete = async (serviceId: string) => {
    setEdit(null);
    deleteServiceMutation.mutate(
      { serviceId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["all-services"] });
          toast.success("Deleted Service Successfully");
        },
      }
    );
  };

  const handleSave = async (serviceId: string) => {
    setEdit(null);
    updateServiceMutation.mutate(
      { serviceId, price, duration },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["all-services"] });
        },
      }
    );
  };

  const handleShare = async (service: Service) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/experts/generate-svg",
        {
          title: service.services.title,
          description: service.services.shortDescription,
          duration: service.services.duration,
          price: service.services.amount,
          type: service.services.type,
        }
      );

      setSvgContent(response.data.svg);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadTemplate = () => {
    if (svgContent) {
      const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
      saveAs(blob, "service_template.svg");
    } else {
      toast.error("No template available to download");
    }
  };

  const shareToLinkedIn = () => {
    const text = encodeURIComponent("Check out my new service on Delta Factor!");
    const url = encodeURIComponent(window.location.href);
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`;
    window.open(linkedInShareUrl, "_blank", "width=570,height=520");
  };

  if (isLoading) return <SkeletonCard />;
  
  return (
    <div className="h-screen flex flex-col p-8 gap-5 bg-[#F7F6F9]">
      <div className="flex-[0.1] flex items-center justify-between p-1">
        <h1 className="text-3xl font-semibold">Services</h1>
        <Button className="bg-[#6425FE]" onClick={() => setSelectedStep(1)}>
          + New Service
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {services.length > 0 ? (
          services.map((service: Service, x: Key | null | undefined) => (
            <Card className="p-6 rounded-lg shadow-md bg-white" key={x}>
              <div className="flex justify-between items-start">
                <span className="bg-orange-100 text-orange-600 text-sm px-2 py-1 rounded">
                  {service.services.type}
                </span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Share1Icon
                      className="text-gray-500 cursor-pointer"
                      onClick={() => handleShare(service)}
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[720px] rounded-xl">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-bold">
                        Share your session with your network
                      </DialogTitle>
                      <DialogDescription className="font-medium text-[14px] text-black border p-4 flex flex-col items-center">
                        <div className="gap-4 flex flex-col">
                          <p>
                            🎉 Exciting news! I’m thrilled to announce that I’ve
                            joined Delta Factor, a platform where I can offer my
                            expertise and connect with all of you! 🚀
                          </p>
                          <p>
                            {" "}
                            Delta Factor is designed for sharing knowledge and
                            providing guidance. Whether you’re looking for
                            mentorship on user behavior, navigating the nuances
                            of accessibility, or just want to dive into
                            discussions about mountains and nature, I’m here to
                            help! 💡
                          </p>{" "}
                          <p>
                            {" "}
                            Sharing my skills and giving back to our amazing
                            community is something I’m deeply passionate about.
                            Delta Factor makes it seamless for us to connect and
                            grow together. 🌟{" "}
                          </p>{" "}
                          <p>
                            {" "}
                            Join me on Delta Factor, and let's explore, learn,
                            and achieve greatness together!
                          </p>{" "}
                        </div>
                        {svgContent && (
                          <div
                            className="mb-4"
                            dangerouslySetInnerHTML={{ __html: svgContent }}
                          />
                        )}
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <Button
                        type="submit"
                        className="bg-purple-100 text-purple-600 px-4 py-2 rounded border border-purple-500 hover:color-[#6425FE]"
                        onClick={downloadTemplate}
                      >
                        Download this Template!
                      </Button>
                      <Button type="submit" className="bg-[#6425FE]" onClick={shareToLinkedIn}>
                        Share to your LinkedIn Network
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <h2 className="text-2xl font-semibold mt-4">
                {service.services.title}
              </h2>
              <p className="text-gray-600 mt-2">
                {service.services.shortDescription}
              </p>
              <div className="mt-4">
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>Bookings</span>
                  <span>{service.totalBookings}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${(service.totalBookings / 100) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <img src={clock} alt="clock" />
                    {service.services.duration} mins
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={rupee} alt="rupee" />₹{service.services.amount}
                  </span>
                </div>

                <Sheet>
                  <SheetTrigger asChild>
                    <button className="bg-purple-100 text-purple-600 px-4 py-2 rounded border border-purple-500">
                      View details
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[500px]">
                    <div className="top-0 left-0 right-0 z-10 p-4 bg-white border-gray-200">
                      <SheetHeader className="flex flex-row justify-between items-center">
                        <SheetClose asChild>
                          <button className="text-gray-600 hover:text-gray-900">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </SheetClose>
                        {edit === service.services.id ? (
                          <Button
                            onClick={() => handleSave(service.services.id)}
                            className="bg-green-500"
                          >
                            Save Changes
                          </Button>
                        ) : (
                          <div className="space-x-2">
                            <Button className="bg-red-400" onClick={()=> handleDelete(service.services.id)}>Delete</Button>
                          <Button
                            onClick={() => handleEdit(service)}
                            className="bg-[#6425FE]"
                          >
                            ✎ Edit
                          </Button>
                          </div>
                        )}
                      </SheetHeader>
                    </div>
                    <div className="mt-20 p-4 overflow-y-auto h-[calc(100vh-80px)]">
                      <div>
                        <span className="bg-orange-100 text-orange-600 text-sm px-2 py-1 rounded">
                          {service.services.type}
                        </span>
                        <SheetTitle className="text-2xl font-semibold">
                          {service.services.title}
                        </SheetTitle>
                      </div>
                      <h3 className="text-xl font-semibold mt-4">
                        Description
                      </h3>
                      <p className="text-gray-600 mt-2">
                        {service.services.description}
                      </p>
                      <div className="mt-4">
                        <div className="flex justify-between gap-4">
                          <div>
                            <span className="block font-semibold">
                              Duration (mins)
                            </span>
                            <input
                              type="text"
                              value={
                                edit === service.services.id
                                  ? duration
                                  : service.services.duration
                              }
                              disabled={edit !== service.services.id}
                              className="border border-gray-300 p-2 rounded w-[242px]"
                              onChange={(e) => setDuration(e.target.value)}
                            />
                          </div>
                          <div>
                            <span className="block font-semibold">
                              Pricing (INR)
                            </span>
                            <input
                              type="text"
                              value={
                                edit === service.services.id
                                  ? price
                                  : service.services.amount
                              }
                              disabled={edit !== service.services.id}
                              className="border border-gray-300 p-2 rounded w-[50%]"
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </Card>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              paddingTop: "130px",
              fontSize: "20px",
            }}
          >
            No Data Available
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceList;
