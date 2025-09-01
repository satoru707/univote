import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import Layout from '../../components/common/Layout';
import { useAuth } from '../../context/AuthContext';
import { MOCK_MODE } from '../../utils/constants';
import { mockApi } from '../../api/mockData';

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      let response;
      
      if (MOCK_MODE) {
        response = await mockApi.adminLogin(formData.email, formData.password);
      } else {
        // POST /admin/login
        // Request: { email, password }
        // Response: { token, role: 'admin' }
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Invalid credentials');
        }
        
        response = await res.json();
      }

      const adminUser = {
        id: `admin-${formData.email}`,
        email: formData.email,
        role: 'admin' as const,
        verified: true
      };

      login(response.token, adminUser);
      navigate('/admin/dashboard');
      toast.success('Logged in successfully');
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
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
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">Admin Login</h1>
              <p className="text-neutral-600">
                Access the administration panel
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="admin@university.edu"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <LogIn className="h-4 w-4" />
                <span>{isSubmitting ? 'Logging in...' : 'Login'}</span>
              </button>
            </form>

            {MOCK_MODE && (
              <div className="mt-6 p-4 bg-warning-50 border border-warning-200 rounded-lg">
                <p className="text-xs text-warning-800">
                  <strong>Demo Mode:</strong> Use admin@university.edu / admin123
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

export default AdminLogin;