import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { SkeletonCard } from "../molecules/SkeltonCard";

const COLORS = ["#FF6384", "#FF9F40", "#4BC0C0", "#36A2EB"];

interface PieData {
  name: string;
  value: number;
}

interface DynamicPieChartProps {
  pieData: PieData[];
  isPieDataLoading: boolean;
}

export const DynamicPieChart: React.FC<DynamicPieChartProps> = ({ pieData,isPieDataLoading }) => {
    
    if(isPieDataLoading) return <div><SkeletonCard/></div>
    const validPieData = Array.isArray(pieData) ? pieData : []
    const totalEarnings = validPieData.reduce((acc, entry) => acc + entry.value, 0);
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="left"
            iconType="square"
            iconSize={10}
          />
          <Pie
            data={validPieData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {validPieData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="24px"
            fontWeight="bold"
          >
            ₹{totalEarnings}
          </text>
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="16px"
            fill="#999"
          >
            Total earnings
          </text>
        </PieChart>
      </ResponsiveContainer>
    );
  };