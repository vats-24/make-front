import { DynamicPieChart } from "../organisms/DynamicPieChart";
import { ChartCard } from "../organisms/ChartCard";
import useGetMonthlyEarnings from "@/queries/dashboard/use-get-monthlyearnings";
import useGetServiceDetails from "@/queries/earnings/use-get-service-details";
import { SkeletonCard } from "../molecules/SkeltonCard";

interface ServiceDetail {
  title: string;
  duration: string;
  price: string;
  totalBookings: number;
  totalEarnings: number;
}

const Earnings = ({ status = "Completed" }) => {
  const {
    data: serviceDetail = [],
    isLoading,
    isError,
  } = useGetServiceDetails();
  const { data: pieData, isLoading: isPieDataLoading } =
    useGetMonthlyEarnings();

  if (isLoading || isPieDataLoading) {
    return (
      <div>
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col p-8 gap-8 bg-[#F7F6F9]">
      <div className="flex items-center justify-between p-1 relative">
        <h1 className="text-4xl font-semibold">Earnings</h1>
      </div>
      <div className="flex gap-4">
        <div className="w-[60%] bg-white">
          <ChartCard />
        </div>
        <div className="w-[30%] bg-white p-5 rounded-3xl border">
          <h1 className="text-3xl font-semibold mb-4">Monthly Earnings</h1>
          <DynamicPieChart
            pieData={pieData}
            isPieDataLoading={isPieDataLoading}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 w-[60%] justify-between">
        {serviceDetail?.length > 0 &&
          serviceDetail.map((service: ServiceDetail) => (
            // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
            <div className="flex space-x-4 p-4 rounded-lg bg-white shadow-md">
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{service.title}</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 ">
                    <span>{service.duration}</span>
                    <span>{service.price}</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 mt-2 text-sm rounded-full text-center ${
                    status === "Upcoming"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {status}
                </span>
              </div>
              <div className="flex-1 text-center space-y-3">
                <p className="text-md text-gray-500">Total no. of bookings:</p>
                <p className="text-3xl font-bold">{service.totalBookings}</p>
                <p className="text-md text-gray-500">Earnings</p>
                <p className="text-3xl font-bold">{service.totalEarnings}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Earnings;
