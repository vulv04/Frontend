import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBarChart,
  RadialBar,
  ComposedChart,
  ScatterChart,
  Scatter,
  ZAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", sales: 4000, profit: 2400, customers: 240 },
  { name: "Feb", sales: 3000, profit: 1398, customers: 221 },
  { name: "Mar", sales: 2000, profit: 9800, customers: 229 },
  { name: "Apr", sales: 2780, profit: 3908, customers: 200 },
  { name: "May", sales: 1890, profit: 4800, customers: 218 },
  { name: "Jun", sales: 2390, profit: 3800, customers: 250 },
];

const pieData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Furniture", value: 300 },
  { name: "Books", value: 200 },
];

const radarData = [
  { subject: "Quality", A: 120 },
  { subject: "Speed", A: 98 },
  { subject: "Price", A: 86 },
  { subject: "Design", A: 99 },
  { subject: "Service", A: 85 },
];

const radialBarData = [{ name: "Goal", value: 80, fill: "#8884d8" }];

const donutData = [
  { name: "Delivered", value: 300 },
  { name: "Processing", value: 200 },
  { name: "Cancelled", value: 100 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#aa46be",
  "#ff6f61",
];

const DashBoardPage = () => {
  return (
    <div className="container my-5">
      <h2 className="mb-4">Dashboard Statistics</h2>
      <div className="row">
        {/* 1. Bar Chart */}
        <div className="col-md-6 mb-4">
          <h5>Monthly Sales & Profit</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
              <Bar dataKey="profit" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 2. Line Chart */}
        <div className="col-md-6 mb-4">
          <h5>Monthly Customers</h5>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="customers" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 3. Pie Chart */}
        <div className="col-md-6 mb-4">
          <h5>Sales by Category</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 4. Area Chart */}
        <div className="col-md-6 mb-4">
          <h5>Revenue Trend</h5>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 5. Radar Chart */}
        <div className="col-md-6 mb-4">
          <h5>Performance Metrics</h5>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 6. Radial Bar Chart */}
        <div className="col-md-6 mb-4">
          <h5>Goal Completion</h5>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              barSize={15}
              data={radialBarData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar minAngle={15} background clockWise dataKey="value" />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* 7. Composed Chart */}
        <div className="col-md-6 mb-4">
          <h5>Sales vs Customers</h5>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="customers" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        {/* 9. Donut Chart */}
        <div className="col-md-6 mb-4">
          <h5>Order Status</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {donutData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
