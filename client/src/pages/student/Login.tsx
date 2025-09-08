import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Layout from '../../components/common/Layout';
import { MOCK_MODE } from '../../utils/constants';
import { mockApi } from '../../api/mockData';

const StudentLogin: React.FC = () => {
  const [matricNo, setMatricNo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [lastSent, setLastSent] = useState<string | null>(null);

  React.useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!matricNo.trim()) {
      toast.error('Please enter your matric number');
      return;
    }

    setIsSubmitting(true);

    try {
      let response;
      
      if (MOCK_MODE) {
        response = await mockApi.requestVerification(matricNo);
      } else {
        // POST /auth/request-verification
        // Request: { matricNo }
        // Response: { message, maskedEmail, tokenSentAt }
        const res = await fetch('/api/auth/request-verification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ matricNo })
        });
        
        if (!res.ok) {
          throw new Error('Failed to send verification');
        }
        
        response = await res.json();
      }

      toast.success(`Verification link sent to ${response.maskedEmail}`);
      setLastSent(response.maskedEmail);
      setCooldown(60);
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send verification');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">Login</h1>
              <p className="text-neutral-600">
                Enter your matric number to receive a verification link
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="matricNo" className="block text-sm font-medium text-neutral-700 mb-2">
                  Matric Number
                </label>
                <input
                  type="text"
                  id="matricNo"
                  value={matricNo}
                  onChange={(e) => setMatricNo(e.target.value.toUpperCase())}
                  placeholder="e.g., UNI2025001"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || cooldown > 0}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>
                  {isSubmitting 
                    ? 'Sending...' 
                    : cooldown > 0 
                    ? `Resend in ${cooldown}s` 
                    : 'Send Verification Link'
                  }
                </span>
              </button>
            </form>

            {lastSent && (
              <div className="mt-6 p-4 bg-success-50 border border-success-200 rounded-lg">
                <p className="text-sm text-success-800">
                  Verification link sent to <strong>{lastSent}</strong>
                </p>
                <p className="text-xs text-success-700 mt-1">
                  Check your university email and click the link to verify your account.
                </p>
              </div>
            )}

            <div className="mt-8 text-center">
              <Link
                to="/"
                className="inline-flex items-center space-x-1 text-neutral-600 hover:text-neutral-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentLogin;