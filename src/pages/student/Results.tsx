import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Shield, Users, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Layout from '../../components/common/Layout';
import Loading from '../../components/common/Loading';
import { MOCK_MODE } from '../../utils/constants';
import { mockApi } from '../../api/mockData';

const Results: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchResults(id);
    }
  }, [id]);

  const fetchResults = async (electionId: string) => {
    setLoading(true);
    try {
      let response;
      
      if (MOCK_MODE) {
        response = await mockApi.getResults(electionId);
      } else {
        // GET /elections/results/:id
        // Response: { election, candidates: [{ id, name, votes }], totalVotes, totalEligible, integrity: { status } }
        const res = await fetch(`/api/elections/results/${electionId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('univote_token')}` }
        });
        
        if (!res.ok) throw new Error('Failed to fetch results');
        response = await res.json();
      }

      setResults(response);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading message="Loading election results..." />
        </div>
      </Layout>
    );
  }

  if (!results) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">Results Not Available</h1>
            <p className="text-neutral-600 mb-6">
              Results are only visible after the election closes.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-primary-600 hover:text-primary-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const chartData = results.candidates
    .map((candidate: any) => ({
      name: candidate.name,
      votes: candidate.votes,
      percentage: ((candidate.votes / results.totalVotes) * 100).toFixed(1)
    }))
    .sort((a: any, b: any) => b.votes - a.votes);

  const turnoutPercentage = ((results.totalVotes / results.totalEligible) * 100).toFixed(1);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-800 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>

          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Election Results
          </h1>
          <h2 className="text-xl text-neutral-600">{results.election.title}</h2>
        </div>

        {/* Integrity Status */}
        <div className="mb-8">
          <div className={`
            flex items-center space-x-2 p-4 rounded-lg border
            ${results.integrity.status === 'ok' 
              ? 'bg-success-50 border-success-200 text-success-800' 
              : 'bg-error-50 border-error-200 text-error-800'
            }
          `}>
            {results.integrity.status === 'ok' ? (
              <>
                <Shield className="h-5 w-5" />
                <span className="font-medium">Election Integrity: Verified ✅</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">Election Integrity: Compromised ❌</span>
                <a href="/contact-admin" className="underline ml-2">Contact Admin</a>
              </>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 text-center">
            <TrendingUp className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-neutral-900">{results.totalVotes}</p>
            <p className="text-sm text-neutral-600">Total Votes</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 text-center">
            <Users className="h-8 w-8 text-secondary-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-neutral-900">{turnoutPercentage}%</p>
            <p className="text-sm text-neutral-600">Turnout Rate</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 text-center">
            <Shield className="h-8 w-8 text-success-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-neutral-900">{results.totalEligible}</p>
            <p className="text-sm text-neutral-600">Eligible Voters</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Vote Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
                />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  formatter={(value, name) => [value, 'Votes']}
                  labelFormatter={(label) => `Candidate: ${label}`}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="votes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Detailed Results</h3>
          <div className="space-y-4">
            {chartData.map((candidate: any, index: number) => (
              <div key={candidate.name} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                    ${index === 0 ? 'bg-warning-500' : index === 1 ? 'bg-neutral-400' : 'bg-neutral-300'}
                  `}>
                    {index + 1}
                  </div>
                  <span className="font-medium text-neutral-900">{candidate.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-neutral-900">{candidate.votes} votes</p>
                  <p className="text-sm text-neutral-600">{candidate.percentage}%</p>
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