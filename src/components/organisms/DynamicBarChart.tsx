import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SkeletonCard } from "../molecules/SkeltonCard";

interface BarData {
  name: string;
  value: number;
}

interface DynamicBarChartProps {
  barData: BarData[];
  isBarDataLoading: boolean;
}

export const DynamicBarChart: React.FC<DynamicBarChartProps> = ({ barData,isBarDataLoading }) => {

    if(isBarDataLoading) return <div><SkeletonCard/></div>
    return (
      <ResponsiveContainer width="100%" height={300}>
      {barData && barData.length > 0 ? (
        <BarChart
          data={barData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            iconType="circle"
            iconSize={10}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {barData.map((da, index) => (
            <Bar key={index} dataKey={String(Object.keys(da)[1])} fill="#36A2EB" />
          ))}
        </BarChart>
      ) : (
        <div style={{ textAlign: 'center', paddingTop: '130px', fontSize: '20px' }}>No Data Available</div>
      )}
    </ResponsiveContainer>
    );
  };