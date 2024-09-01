import { Button } from "../atoms/ui/button";
import { useState } from "react";
import ChartIcon from "@assets/chart-icon.svg";
import BookIcon from "@assets/bookmark-icon.svg";
import PageIcon from "@assets/page-icon.svg";
import { Card } from "@components/atoms/ui/card";
import DateRangeSelector from "../molecules/DateRange";
import { DynamicBarChart } from "../organisms/DynamicBarChart";
import { DynamicPieChart } from "../organisms/DynamicPieChart";
import useGetStats from "@/queries/dashboard/use-get-stats";
import useGetMonthlyServiceBookings from "@/queries/dashboard/use-get-monthly-service-bookings";
import useGetMonthlyEarnings from "@/queries/dashboard/use-get-monthlyearnings";
import useGetSessionBookings from "@/queries/dashboard/use-get-session-bookings";
import { SkeletonCard } from "../molecules/SkeltonCard";
import { useNavigate } from "react-router-dom";
import useGetprofileDetails from "@/queries/profile/use-get-profile";

const COLORS = ["#FF6384", "#FF9F40", "#4BC0C0", "#36A2EB"];


interface Session {
  id: number;
  title: string;
  performance: number;
  color: string;
  borderColor: string;
  textColor: string;
  totalBookings: number;
}

interface PerformanceBarProps {
  performance: number;
  color: string;
}

const PerformanceBar: React.FC<PerformanceBarProps> = ({ performance, color }) => (
  <div className="w-full bg-gray-200 rounded-full h-1.5">
    <div
      className="h-1.5 rounded-full"
      style={{ width: `${performance}%`, backgroundColor: color }}
    />
  </div>
);

const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<string>("alldate");

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
  };

  const navigate = useNavigate()


  const { data: filteredStats = {}, isLoading: isStatsLoading } = useGetStats(dateRange);
  const { data: barData, isLoading: isBarDataLoading } = useGetMonthlyServiceBookings();
  const { data: topSessions } = useGetSessionBookings();
  const { data: pieData, isLoading: isPieDataLoading } = useGetMonthlyEarnings();
  const { data: profileData, isLoading } = useGetprofileDetails();


  const validTopSessions: Session[] = Array.isArray(topSessions) ? topSessions : [];

  if(isLoading) return <div>Loading...</div>

  return (
    <div className="h-screen flex flex-col justify-between p-8 gap-5 bg-[#F7F6F9]">
      <div className="flex-[0.5] flex items-center justify-between">
        <h1 className="text-xl font-semibold">Hello, {profileData?.firstName}</h1>
        <Button className="bg-[#6425FE]" onClick={()=> navigate("/services")}>+ Create Service</Button>
      </div>
      <div className="flex-[4] flex gap-0 justify-between">
        <div className="bg-[#FFFFFF] w-[60%] rounded-3xl border">
          {!isStatsLoading ? (<div className="mx-auto p-8 flex flex-col justify-between h-full">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-2xl font-semibold mb-4">Your, Dashboard</h1>
                <p className="text-center mb-8 font-light text-md">
                  Track your insights at one place
                </p>
              </div>
              <DateRangeSelector selectedRange={dateRange} onDateRangeChange={handleDateRangeChange} />
            </div>
            <div className="flex justify-between p-1">
              <Card className="card bg-[#FFE2E5] border-none">
                <div className="flex flex-col justify-start gap-y-4 p-4">
                  <div className="h-[40px]">
                    <img src={ChartIcon} alt="chart" />
                  </div>
                  <h2 className="text-3xl font-bold">
                    {filteredStats.sessionsCompleted}
                  </h2>
                  <p>Sessions Completed</p>
                  <p className="text-green-500">+20% from last month</p>
                </div>
              </Card>
              <Card className="card bg-[#FFF4DE] border-none">
                <div className="flex flex-col justify-start gap-y-4 p-4">
                  <div className="h-[40px]">
                    <img src={PageIcon} alt="chart" />
                  </div>
                  <h2 className="text-3xl font-bold">
                    {filteredStats.totalBookings}
                  </h2>
                  <p>Total bookings</p>
                  <p className="text-green-500">+20% from last month</p>
                </div>
              </Card>
              <Card className="card bg-[#DCFCE7] border-none">
                <div className="flex flex-col justify-start gap-y-4 p-4">
                  <div className="h-[40px]">
                    <img src={BookIcon} alt="chart" />
                  </div>
                  <h2 className="text-3xl font-bold">
                    {filteredStats.mentoringTime}
                  </h2>
                  <p>Mentoring Times</p>
                  <p className="text-green-500">+20% from last month</p>
                </div>
              </Card>
            </div>
          </div>): <SkeletonCard/>}
          
        </div>
        <div className="bg-[#FFFFFF] w-[38%] rounded-3xl p-3 border">
          <h2 className="text-2xl font-semibold mb-4 mt-3">Bookings</h2>
          <div>
            <DynamicBarChart barData={barData} isBarDataLoading={isBarDataLoading} />
          </div>
        </div>
      </div>
      <div className="flex-[4] flex justify-between">
        <div className="bg-[#FFFFFF] w-[60%] rounded-3xl border">
          <div className="p-4 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 mt-1">Top sessions</h3>
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead className="text-gray-500">
                <tr>
                  <th className="px-4 py-2">S.No</th>
                  <th className="px-4 py-2">Session title</th>
                  <th className="px-4 py-2">Performance</th>
                  <th className="px-4 py-2">No. of bookings</th>
                </tr>
              </thead>
              <tbody>
                {validTopSessions.length > 0 ? (validTopSessions.map((session, x) => (
                  <tr key={session.id} className="bg-white rounded-lg shadow-sm">
                    <td className="px-4 py-2 text-gray-500">
                      {String(x + 1).padStart(2, "0")}
                    </td>
                    <td className="px-4 py-2 font-medium">{session.title}</td>
                    <td className="px-4 py-2">
                      <PerformanceBar performance={session.performance} color={COLORS[x % COLORS.length]}  />
                    </td>
                    <td className="px-4 py-2 font-medium">
                      <span
                        className={`px-3 py-1 ${session.borderColor} ${session.textColor} border rounded-full`}
                      >
                        {session.totalBookings}
                      </span>
                    </td>
                  </tr>
                ))) : <div style={{ textAlign: 'center', paddingTop: '80px', fontSize: '20px' }}>No Data Available</div>}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-[#FFFFFF] w-[38%] rounded-3xl p-3 border">
          <h1 className="text-2xl font-semibold mb-4 mt-2">Earnings</h1>
          <DynamicPieChart pieData={pieData} isPieDataLoading={isPieDataLoading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
