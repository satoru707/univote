import React, { useEffect, useState } from 'react';
import { Calendar, Users, TrendingUp, Plus, Settings, Eye, Download } from 'lucide-react';
import Layout from '../../components/common/Layout';
import AdminCard from '../../components/admin/AdminCard';
import ElectionModal from '../../components/admin/ElectionModal';
import Loading from '../../components/common/Loading';
import toast from 'react-hot-toast';
import { MOCK_MODE } from '../../utils/constants';
import { mockApi } from '../../api/mockData';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [elections, setElections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      let [statsResponse, electionsResponse] = await Promise.all([
        MOCK_MODE ? mockApi.getAdminStats() : fetch('/api/admin/stats').then(r => r.json()),
        MOCK_MODE ? mockApi.getAllElections() : fetch('/api/admin/elections').then(r => r.json())
      ]);

      if (!MOCK_MODE) {
        // GET /admin/stats
        // Response: { activeElections, totalVerifiedVoters, avgTurnout }
        
        // GET /admin/elections
        // Response: [{ id, title, description, startsAt, endsAt, isActive, candidateCount, voteCount }]
      }

      setStats(statsResponse);
      setElections(electionsResponse);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateElection = async (electionData: any) => {
    setIsCreating(true);
    try {
      let response;
      
      if (MOCK_MODE) {
        response = await mockApi.createElection(electionData);
      } else {
        // POST /admin/create-election
        // Request: { title, description, startsAt, endsAt, candidates: [...] }
        // Response: { id, message }
        const res = await fetch('/api/admin/create-election', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('univote_token')}`
          },
          body: JSON.stringify(electionData)
        });
        
        if (!res.ok) throw new Error('Failed to create election');
        response = await res.json();
      }

      toast.success(response.message);
      setShowCreateModal(false);
      fetchDashboardData(); // Refresh data
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create election');
    } finally {
      setIsCreating(false);
    }
  };

  const handleCloseElection = async (electionId: string) => {
    if (!confirm('Are you sure you want to close this election? This action cannot be undone.')) {
      return;
    }

    try {
      if (MOCK_MODE) {
        await mockApi.closeElection(electionId);
      } else {
        // POST /admin/election/:id/close
        // Response: { message }
        const res = await fetch(`/api/admin/election/${electionId}/close`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('univote_token')}` }
        });
        
        if (!res.ok) throw new Error('Failed to close election');
      }

      toast.success('Election closed successfully');
      fetchDashboardData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to close election');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading message="Loading dashboard..." />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Admin Dashboard</h1>
            <p className="text-neutral-600">Manage elections and monitor voting activity</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Election</span>
          </button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <AdminCard
              title="Active Elections"
              value={stats.activeElections}
              icon={Calendar}
              color="primary"
            />
            <AdminCard
              title="Verified Voters"
              value={stats.totalVerifiedVoters.toLocaleString()}
              icon={Users}
              color="secondary"
            />
            <AdminCard
              title="Average Turnout"
              value={`${stats.avgTurnout}%`}
              icon={TrendingUp}
              color="success"
            />
          </div>
        )}

        {/* Elections Management */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200">
          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-semibold text-neutral-900">Elections Management</h2>
          </div>
          
          <div className="divide-y divide-neutral-200">
            {elections.map((election) => (
              <div key={election.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                      {election.title}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-2">{election.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-neutral-500">
                      <span>{new Date(election.startsAt).toLocaleDateString()} - {new Date(election.endsAt).toLocaleDateString()}</span>
                      <span>{election.candidateCount} candidates</span>
                      <span>{election.voteCount} votes</span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    election.isActive 
                      ? 'bg-success-100 text-success-700' 
                      : 'bg-neutral-100 text-neutral-700'
                  }`}>
                    {election.isActive ? 'Active' : 'Closed'}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {election.isActive && (
                    <button
                      onClick={() => handleCloseElection(election.id)}
                      className="px-3 py-1 bg-error-100 text-error-700 rounded-lg text-sm font-medium hover:bg-error-200 transition-colors"
                    >
                      Close Election
                    </button>
                  )}
                  
                  <button
                    onClick={() => window.open(`/elections/${election.id}/results`, '_blank')}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-200 transition-colors flex items-center space-x-1"
                  >
                    <Eye className="h-3 w-3" />
                    <span>View Results</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      // TODO: Implement CSV export functionality
                      toast.success('CSV export would be triggered here');
                    }}
                    className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-lg text-sm font-medium hover:bg-secondary-200 transition-colors flex items-center space-x-1"
                  >
                    <Download className="h-3 w-3" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {elections.length === 0 && (
            <div className="p-12 text-center">
              <Calendar className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No Elections Yet</h3>
              <p className="text-neutral-600 mb-4">Create your first election to get started.</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Create Election
              </button>
            </div>
          )}
        </div>

        <ElectionModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateElection}
          isSubmitting={isCreating}
        />
      </div>
    </Layout>
  );
};

export default AdminDashboard;