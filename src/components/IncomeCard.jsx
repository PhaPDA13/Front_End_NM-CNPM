import React from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { value: 40 }, { value: 60 }, { value: 45 }, { value: 82 }, 
  { value: 55 }, { value: 75 }, { value: 60 }, { value: 85 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-100 shadow-lg rounded-md flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
        <span className="text-gray-700 font-bold text-sm">{payload[0].value}</span>
      </div>
    );
  }
  return null;
};

const IncomeCard = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 w-80 flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <h3 className="text-gray-500 text-sm font-medium">Total Income</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">15102</span>
          <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-0.5 rounded">
            23%
          </span>
        </div>
        <span className="text-gray-400 text-xs">Current Month</span>
      </div>

      <div className="h-16 w-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} 
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#4ade80" 
              strokeWidth={2} 
              dot={false} 
              activeDot={{ r: 4, fill: '#4ade80', stroke: 'white', strokeWidth: 2 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
    </div>
  );
};

export default IncomeCard;