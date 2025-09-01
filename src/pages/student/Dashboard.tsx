import React, { useEffect, useState } from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import Layout from '../../components/common/Layout';
import ElectionCard from '../../components/student/ElectionCard';
import Loading from '../../components/common/Loading';
import { useAuth } from '../../context/AuthContext';
import { useElection } from '../../context/ElectionContext';
import { MOCK_MODE } from '../../utils/constants';
import { mockApi } from '../../api/mockData';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { elections, setElections } = useElection();
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const [loading, setLoading] = useState(true);
  const [pastElections, setPastElections] = useState<any[]>([]);

  useEffect(() => {
    fetchElections();
    fetchUserData();
  }, [activeTab]);

  const fetchElections = async () => {
    setLoading(true);
    try {
      let response;
      
      if (MOCK_MODE) {
        if (activeTab === 'active') {
          response = await mockApi.getActiveElections();
        } else {
          response = await mockApi.getPastElections();
        }
      } else {
        // GET /elections/active or /elections/past
        const endpoint = activeTab === 'active' ? '/api/elections/active' : '/api/elections/past';
        const res = await fetch(endpoint, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('univote_token')}` }
        });
        
        if (!res.ok) throw new Error('Failed to fetch elections');
        response = await res.json();
      }

      if (activeTab === 'active') {
        setElections(response);
      } else {
        setPastElections(response);
      }
    } catch (error) {
      console.error('Error fetching elections:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      if (MOCK_MODE) {
        await mockApi.getMe();
      } else {
        // GET /auth/me
        // Response: { id, matricNo, role, verified, votes: [...] }
        const res = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('univote_token')}` }
        });
        
        if (!res.ok) throw new Error('Failed to fetch user data');
        const userData = await res.json();
        // Update context if needed
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const currentElections = activeTab === 'active' ? elections : pastElections;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Welcome back, {user?.matricNo}
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
                onClick={() => setActiveTab('active')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'active'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Active Elections</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'past'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Past Elections</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Elections Grid */}
        {loading ? (
          <Loading message="Loading elections..." />
        ) : currentElections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentElections.map((election) => (
              <ElectionCard key={election.id} election={election} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              No {activeTab} elections
            </h3>
            <p className="text-neutral-600">
              {activeTab === 'active' 
                ? 'There are no active elections at the moment.' 
                : 'You haven\'t participated in any past elections.'
              }
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StudentDashboard;