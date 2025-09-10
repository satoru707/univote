import {
  ArrowLeft,
  TrendingUp,
  Shield,
  Users,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Layout from "../../components/common/Layout";

const Results: React.FC = () => {
  const ElectionStatus = "ok";
  const chartData = [
    {
      candidate: { name: "john doe", vote: 1400, percentage: 55 },
      value: 12,
      index: 1,
    },
    {
      candidate: { name: "samson", vote: 1000, percentage: 45 },
      value: 8,
      index: 2,
    },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => "/dashboard"}
            className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-800 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>

          <h1 className="text-3xl font-bold text-primary-blue mb-2">
            Election Results
          </h1>
          <h2 className="text-xl text-neutral-600">Student Union President</h2>
        </div>

        {/* Integrity Status */}
        <div className="mb-8">
          <div
            className={`
            flex items-center space-x-2 p-4 rounded-lg border
            ${
              ElectionStatus === "ok"
                ? "bg-success-50 border-success-200 text-success-800"
                : "bg-error-50 border-error-200 text-error-800"
            }
          `}
          >
            {ElectionStatus === "ok" ? (
              <>
                <Shield className="h-5 w-5" />
                <span className="font-medium">
                  Election Integrity: Verified ✅
                </span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">
                  Election Integrity: Compromised ❌
                </span>
                <a href="/contact-admin" className="underline ml-2">
                  Contact Admin
                </a>
              </>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 text-center">
            <TrendingUp className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-neutral-900">2000</p>
            <p className="text-sm text-neutral-600">Total Votes</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 text-center">
            <Users className="h-8 w-8 text-secondary-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-neutral-900">74%</p>
            <p className="text-sm text-neutral-600">Turnout Rate</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 text-center">
            <Shield className="h-8 w-8 text-success-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-neutral-900">2700</p>
            <p className="text-sm text-neutral-600">Eligible Voters</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-primary-blue mb-6">
            Vote Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={730} height={250} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6b7280" />
                <XAxis dataKey="candidate.name" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">
            Detailed Results
          </h3>
          <div className="space-y-4">
            {chartData.map((candidates, index: number) => (
              <div
                key={candidates.candidate.name}
                className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                    ${
                      index === 0
                        ? "bg-warning-500"
                        : index === 1
                        ? "bg-neutral-400"
                        : "bg-neutral-300"
                    }
                  `}
                  >
                    {index + 1}
                  </div>
                  <span className="font-medium text-neutral-900">
                    {candidates.candidate.name}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-neutral-900">
                    {candidates.candidate.vote} votes
                  </p>
                  <p className="text-sm text-neutral-600">
                    {candidates.candidate.percentage}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
