// DashboardPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import StatCard from '../../components/StatCard';
import TopDealerCard from '../../components/TopDealerCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faChartLine, faChartBar, faChartPie } from '@fortawesome/free-solid-svg-icons';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import agencyApi from '../../services/agencyApi';
import reportApi from '../../services/reportApi';
import billApi from '../../services/billApi';
import receiptApi from '../../services/receiptApi';
import LoadingBar from 'react-top-loading-bar';

const DashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [dealerTypeData, setDealerTypeData] = useState([]);
  const [topDealers, setTopDealers] = useState([]);
  const [statData, setStatData] = useState([
    { title: 'Tổng đại lý', value: '0', detail: 'Đang tải...', trend: 'up' },
    { title: 'Doanh số tháng', value: '0', detail: 'Đang tải...', trend: 'up' },
    { title: 'Tổng Công Nợ', value: '0', detail: 'Đang tải...', trend: 'down' },
    { title: 'Phiếu xuất tháng', value: '0', detail: 'Đang tải...', trend: 'up' },
  ]);
  const loadingBarRef = useRef(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      loadingBarRef.current?.continuousStart();

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      // Calculate previous month
      const prevDate = new Date(currentDate);
      prevDate.setMonth(prevDate.getMonth() - 1);
      const prevMonth = prevDate.getMonth() + 1;
      const prevYear = prevDate.getFullYear();

      // Generate array of last 6 months
      const last6Months = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setMonth(date.getMonth() - i);
        last6Months.push({
          month: date.getMonth() + 1,
          year: date.getFullYear()
        });
      }

      // Fetch all data in parallel (including 6 months of sales data)
      const salesPromises = last6Months.map(m => 
        reportApi.getSale(m.year, m.month).catch(() => ({ data: { salesData: [] } }))
      );
      const debtPromises = last6Months.map(m => 
        reportApi.getDebt(m.year, m.month).catch(() => ({ data: { debtData: [] } }))
      );

      const [
        topDealersRes,
        prevDebtReportRes,
        allAgentsRes,
        allBillsRes,
        allReceiptsRes,
        ...allSalesAndDebtRes
      ] = await Promise.all([
        agencyApi.getTopRevenue().catch(() => ({ data: [] })),
        reportApi.getDebt(prevYear, prevMonth).catch(() => ({ data: { debtData: [] } })),
        agencyApi.getAll().catch(() => ({ data: [] })),
        billApi.getAll().catch(() => ({ data: [] })),
        receiptApi.getAll().catch(() => ({ data: [] })),
        ...salesPromises,
        ...debtPromises
      ]);

      // Separate sales and debt responses
      const last6MonthsSales = allSalesAndDebtRes.slice(0, 6);
      const last6MonthsDebts = allSalesAndDebtRes.slice(6, 12);

      console.log(topDealers)
      // --- 1. Process Agents & Calculate Diff ---
      const agents = allAgentsRes.data || [];
      const totalAgents = agents.length;

      // Helper to safely parse dates
      const parseDate = (dateString) => new Date(dateString);

      // Count agents created strictly BEFORE the start of the current month
      const agentsCreatedBeforeThisMonth = agents.filter(agent => {
        if (!agent.createdAt) return true; // Assume old if no date, or adjust logic as needed
        const createdDate = parseDate(agent.createdAt);
        // An agent is "old" if created in a previous year OR (same year AND previous month or earlier)
        return (
            createdDate.getFullYear() < currentYear || 
            (createdDate.getFullYear() === currentYear && (createdDate.getMonth() + 1) < currentMonth)
        );
      }).length;

      // agentsDiff is simply Total Current Agents - Agents from Last Month
      // If agentsDiff is positive, it means new agents were added this month.
      const agentsDiff = totalAgents - agentsCreatedBeforeThisMonth;
      
      console.log('Total Agents:', totalAgents);
      console.log('Agents Before This Month:', agentsCreatedBeforeThisMonth);
      console.log('Agents Diff (Calculated):', agentsDiff);


      // --- 2. Process Top Dealers ---
      let formattedTopDealers = [];
      if (topDealersRes.data && Array.isArray(topDealersRes.data)) {
        formattedTopDealers = topDealersRes.data.slice(0, 5).map((dealer, index) => ({
          name: dealer.name || `Đại lý ${index + 1}`,
          location: `${dealer.district || 'N/A'} - ${dealer.agentType || 'N/A'}`,
          doanhSo: `${(parseFloat(dealer.revenue || 0) / 1000000).toFixed(1)}M VNĐ`,
          congNo: `${(parseFloat(dealer.debtAmount || 0) / 1000000).toFixed(1)}M`,
          orderCount: dealer.orderCount || 0,
          isTop: index === 0
        }));
      }
      setTopDealers(formattedTopDealers.length > 0 ? formattedTopDealers : [
        { name: 'Chưa có dữ liệu', location: 'N/A', doanhSo: '0M VNĐ', congNo: '0M', orderCount: 0, isTop: false }
      ]);


      // --- 3. Process Bills & Revenue ---
      const totalBills = allBillsRes.data.length || 0;
      
      const currentMonthBills = allBillsRes.data.filter(bill => {
        if (!bill.issueDate) return false;
        const billDate = parseDate(bill.issueDate);
        return billDate.getMonth() + 1 === currentMonth && billDate.getFullYear() === currentYear;
      });
      const currentMonthRevenue = currentMonthBills.reduce((sum, bill) => sum + parseFloat(bill.total || 0), 0);

      const prevMonthBills = allBillsRes.data.filter(bill => {
        if (!bill.issueDate) return false;
        const billDate = parseDate(bill.issueDate);
        return billDate.getMonth() + 1 === prevMonth && billDate.getFullYear() === prevYear;
      });
      const prevMonthRevenue = prevMonthBills.reduce((sum, bill) => sum + parseFloat(bill.total || 0), 0);
      const prevMonthBillsCount = prevMonthBills.length;


      // --- 4. Process Debt ---
      console.log(agents)
      console.log(prevDebtReportRes)
      const currentTotalDebt = agents.reduce((sum, agent) => sum + parseFloat(agent.endingDebt || agent.debtAmount || 0), 0);
      const prevDebtData = prevDebtReportRes.data.debtData || [];
      console.log(prevDebtReportRes)
      let prevTotalDebt = prevDebtData.reduce((sum, debt) => sum + parseFloat(debt.endingDebt || 0), 0);
     
      if (prevTotalDebt === 0) prevTotalDebt = currentTotalDebt; 


      // --- 5. Calculate Diffs ---
      const revenueDiff = currentMonthRevenue - prevMonthRevenue;
      const billsDiff = totalBills - prevMonthBillsCount; // Note: This compares Total vs Last Month. Usually you compare Current Month Bills vs Last Month Bills.
      // If you want strictly monthly comparison for bills:
      const monthlyBillsDiff = currentMonthBills.length - prevMonthBillsCount;


      console.log(topDealers)

      // --- 6. Helper & Set State ---
      const formatDiff = (diff, unit = '') => {
        const sign = diff >= 0 ? '+' : '';
        return `${sign}${diff.toLocaleString()}${unit}`;
      };

      // Calculate debt change percentage
      const debtChangePercent = prevTotalDebt > 0 ? ((currentTotalDebt - prevTotalDebt) / prevTotalDebt) * 100 : 0;

      setStatData([
        {
          title: 'Tổng đại lý',
          value: totalAgents.toString(),
          detail: `${formatDiff(agentsDiff)} so với tháng trước`, // Uses the correctly calculated agentsDiff
          trend: agentsDiff >= 0 ? 'up' : 'down'
        },
        {
          title: 'Doanh số tháng',
          value: `${(currentMonthRevenue / 1000000).toFixed(1)}M`,
          detail: `${formatDiff(revenueDiff / 1000000, 'M')} so với tháng trước`,
          trend: revenueDiff >= 0 ? 'up' : 'down'
        },
        {
          title: 'Tổng Công Nợ',
          value: `${(currentTotalDebt / 1000000).toFixed(0)}M`,
          detail: `${formatDiff((currentTotalDebt - prevTotalDebt) / 1000000, 'M')} so với tháng trước`,
          trend: debtChangePercent >= 0 ? 'down' : 'up'
        },
        {
          title: 'Phiếu xuất tháng',
          value: currentMonthBills.length.toString(), // Changed to show monthly bills count
          detail: `${formatDiff(monthlyBillsDiff)} so với tháng trước`,
          trend: monthlyBillsDiff >= 0 ? 'up' : 'down'
        },
      ]);


      // --- 7. Charts & Dealer Types ---
      // Build 6-month chart data
      const chartSalesData = last6Months.map((monthData, index) => {
        const salesRes = last6MonthsSales[index];
        const debtRes = last6MonthsDebts[index];
        
        const monthSalesData = salesRes.data.salesData || [];
        const monthDebtData = debtRes.data.debtData || [];
        
        // Calculate revenue for this month
        const monthRevenue = monthSalesData.length > 0 
          ? monthSalesData.reduce((sum, item) => sum + parseFloat(item.totalRevenue || 0), 0)
          : 0;
        
        // Calculate debt for this month
        const monthDebt = monthDebtData.length > 0 
          ? monthDebtData.reduce((sum, debt) => sum + parseFloat(debt.endingDebt || 0), 0)
          : 0;
        
        return {
          month: `${monthData.month}/${monthData.year}`,
          doanhSo: monthRevenue / 1000000000, // Convert to billions
          congNo: monthDebt / 1000000000 // Convert to billions
        };
      });

      setSalesData(chartSalesData);

      const agentTypeCount = {};
      agents.forEach(agent => {
        let type = agent.agentType?.id;
        if (type === null || type === undefined || type === '') type = 1;
        type = parseInt(type, 10) || 1;
        agentTypeCount[type] = (agentTypeCount[type] || 0) + 1;
      });

      const formattedDealerTypeData = Object.entries(agentTypeCount).map(([type, count]) => ({
        name: `Loại ${type}`,
        value: count,
        color: type == 1 ? '#06b6d4' : type == 2 ? '#3b82f6' : '#8b5cf6'
      }));
      setDealerTypeData(formattedDealerTypeData);

    } catch (error) {
      console.error('Lỗi tải dữ liệu dashboard:', error);
    } finally {
      setLoading(false);
      loadingBarRef.current?.complete();
    }
  };

  return (
    <div className="flex-1 h-full bg-gray-50 dark:bg-gray-900 overflow-y-auto transition-colors duration-300">
      <main className="p-8">
        <LoadingBar color="#06b6d4" ref={loadingBarRef} height={3} />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Tổng quan hệ thống</h1>

        {/* 1. Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statData.map((data, index) => (
            <StatCard
              key={index}
              title={data.title}
              value={data.value}
              detail={data.detail}
              trend={data.trend}
            />
          ))}
        </div>

        {/* 2. Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <FontAwesomeIcon icon={faChartLine} className="text-cyan-500 mr-2" />
              Doanh số & Công nợ theo tháng
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${(value / 1000000000).toFixed(1)}B`} />
                <Tooltip
                  formatter={(value) => [`${(value * 1000000000).toLocaleString()} VNĐ`, '']} // Fixed tooltip display
                  labelFormatter={(label) => `Tháng ${label}`}
                />
                <Legend />
                <Area type="monotone" dataKey="doanhSo" stackId="1" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} name="Doanh số" />
                <Area type="monotone" dataKey="congNo" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Công nợ" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <FontAwesomeIcon icon={faChartPie} className="text-purple-500 mr-2" />
              Phân loại đại lý
            </h2>
            <div className="flex">
              <div className="flex flex-col justify-center pr-6 space-y-3">
                {dealerTypeData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: item.color }}></div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                      <div className="text-gray-600 dark:text-gray-400">{item.value} đại lý</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dealerTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dealerTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Top Dealers */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2" />
            TOP 5 ĐẠI LÝ THEO DOANH SỐ
          </h2>
          <div className="space-y-4">
            {topDealers.map((dealer, index) => (
              <TopDealerCard key={dealer.id || index} dealer={dealer} index={index} />
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default DashboardPage;