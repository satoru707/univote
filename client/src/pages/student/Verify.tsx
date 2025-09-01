import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import Layout from '../../components/common/Layout';
import Loading from '../../components/common/Loading';
import { useAuth } from '../../context/AuthContext';
import { MOCK_MODE } from '../../utils/constants';
import { mockApi } from '../../api/mockData';

const Verify: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setError('Invalid verification link');
      return;
    }

    verifyToken(token);
  }, [token]);

  const verifyToken = async (verificationToken: string) => {
    try {
      let response;
      
      if (MOCK_MODE) {
        response = await mockApi.verifyToken(verificationToken);
      } else {
        // GET /auth/verify/:token
        // Response: { matricNo, verified: true, token }
        const res = await fetch(`/api/auth/verify/${verificationToken}`);
        
        if (!res.ok) {
          throw new Error('Invalid or expired verification token');
        }
        
        response = await res.json();
      }

      const userData = {
        id: `user-${response.matricNo}`,
        matricNo: response.matricNo,
        role: 'student' as const,
        verified: response.verified,
        votes: []
      };

      login(response.token, userData);
      setStatus('success');
      
      setTimeout(() => {
        navigate('/dashboard');
        toast.success('Account verified successfully!');
      }, 2000);
      
    } catch (error) {
      setStatus('error');
      setError(error instanceof Error ? error.message : 'Verification failed');
    }
  };

  const handleRetry = () => {
    navigate('/student/login');
  };

  if (status === 'loading') {
    return (
      <Layout>
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
          <Loading message="Verifying your account..." />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 text-center">
            {status === 'success' ? (
              <>
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-success-100 rounded-full">
                    <CheckCircle className="h-12 w-12 text-success-600" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                  Account Verified!
                </h1>
                <p className="text-neutral-600 mb-6">
                  Your account has been successfully verified. You will be redirected to your dashboard shortly.
                </p>
                <div className="flex justify-center">
                  <div className="flex items-center space-x-2 text-sm text-neutral-500">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Redirecting...</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-error-100 rounded-full">
                    <XCircle className="h-12 w-12 text-error-600" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                  Verification Failed
                </h1>
                <p className="text-neutral-600 mb-6">
                  {error}
                </p>
                <button
                  onClick={handleRetry}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
                >
                  Request New Verification Link
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Verify;