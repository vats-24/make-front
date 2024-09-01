import { useState } from "react";
import DateRangeSelector from "../molecules/DateRange";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useGetAverageEarnings from "@/queries/earnings/use-get-average-earnings";
import { SkeletonCard } from "../molecules/SkeltonCard";

interface ServiceEarningsData {
  service: string;
  earnings: number;
}

interface EarningsData {
  serviceEarnings: ServiceEarningsData[];
  averageEarnings: number;
}

export const ChartCard: React.FC = () => {
  const [dateRange, setDateRange] = useState<string>("alldate");

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
  };

  const { data, isLoading, isError } = useGetAverageEarnings(dateRange);

  const validChartData: ServiceEarningsData[] = Array.isArray(
    data?.serviceEarnings
  )
    ? data.serviceEarnings
    : [];
  const averageEarnings: number | undefined = data?.averageEarnings;

  if (isLoading) {
    return (
      <div>
        <SkeletonCard />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md border">
      <div className="flex mb-4 justify-between">
        <div>
          <h2 className="text-xl font-semibold">You're earning</h2>
          <p className="text-3xl font-bold">
            ₹{averageEarnings !== undefined ? averageEarnings : 0}/session
          </p>
        </div>
        <DateRangeSelector
          selectedRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
        />
      </div>
      {validChartData.length > 0 ? (
        <BarChart
          width={400}
          height={300}
          data={validChartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="service" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="earnings" fill="#8884d8" />
        </BarChart>
      ) : (
        <div
          style={{
            textAlign: "center",
            paddingTop: "130px",
            paddingBottom: "130px",
            fontSize: "20px",
          }}
          className="border"
        >
          No Data Available
        </div>
      )}

      <div className="mt-4 text-sm">
        {validChartData.map((data, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<div className="flex items-center space-x-2 flex-row" key={index}>
            <span className="w-3 h-3 rounded-full bg-purple-500" />
            <span>
              Session-{index + 1}: {data.service}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
