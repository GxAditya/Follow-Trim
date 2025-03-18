import React from 'react';
import { Line } from 'react-chartjs-2';
import { Analytics } from '../types';

interface Props {
  analytics: Analytics[];
  platform: 'instagram' | 'twitter';
}

const AnalyticsDashboard: React.FC<Props> = ({ analytics, platform }) => {
  const chartData = {
    labels: analytics.map(a => new Date(a.date).toLocaleDateString()),
    datasets: [{
      label: 'Following Count',
      data: analytics.map(a => a.followCount),
      borderColor: platform === 'instagram' ? '#E1306C' : '#1DA1F2',
      tension: 0.1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Following Trends`
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <Line data={chartData} options={options} />
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded">
          <h4 className="text-sm font-medium">Total Following</h4>
          <p className="text-2xl font-bold">
            {analytics[analytics.length - 1]?.followCount || 0}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h4 className="text-sm font-medium">30 Day Change</h4>
          <p className="text-2xl font-bold">
            {analytics[analytics.length - 1]?.followCount - analytics[0]?.followCount || 0}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h4 className="text-sm font-medium">Average Engagement</h4>
          <p className="text-2xl font-bold">
            {Math.round(analytics.reduce((acc, curr) => acc + curr.engagementScore, 0) / analytics.length)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
