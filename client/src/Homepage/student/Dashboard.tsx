import { Calendar, TrendingUp } from "lucide-react";
import Layout from "../../components/common/Layout";

const StudentDashboard: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-blue mb-2">
            Welcome back, Michael
          </h1>
          <p className="text-neutral-600">
            Participate in university elections and make your voice heard.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-neutral-200">
            <nav className="-mb-px flex space-x-8">
              <button
                className="py-2 px-1 border-b-2 
              border-b-primary-blue font-medium text-sm transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Active Elections</span>
                </div>
              </button>
              <button className="py-2 px-1 font-medium text-neutral-600 text-sm ">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Past Elections</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Elections Grid */}
        <div className=" electionGrid grid grid-cols-1 hover:bg-slate-100 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-2 border">
          <div>
            <h1 className="font-medium h-7">Student Union President</h1>
            <p className="text-neutral-600">
              This is the Election concerning the Student Union President for
              the 2025 academic Session
              <span className="block mt-2">
                Duration: <strong>11:00am-6:00pm</strong>
              </span>
              <span className="block">
                State: <strong>Active</strong>
              </span>
            </p>
          </div>
        </div>
        <div className=" electionGrid grid grid-cols-1 hover:bg-slate-100 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-2 border">
          <h1 className="font-medium h-7">Faculty President</h1>
          <p className="text-neutral-600">
            This is the Election concerning the Faculty President for the 2025
            academic Session
            <span className="block mt-2">
              Duration: <strong>11:00am-6:00pm</strong>
            </span>
            <span className="block">
              State: <strong>Active</strong>
            </span>
          </p>
        </div>
        <div className="text-center disabled py-12">
          <Calendar className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            No Active elections
          </h3>
          <p className="text-neutral-600">
            There are no active elections at the moment
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
