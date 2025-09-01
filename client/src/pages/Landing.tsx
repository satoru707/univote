import React from 'react';
import { Link } from 'react-router-dom';
import { Vote, Shield, Users, CheckCircle } from 'lucide-react';
import Layout from '../components/common/Layout';

const Landing: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary-100 rounded-full">
                <Vote className="h-12 w-12 text-primary-600" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              University E-Voting System
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Secure, transparent, and democratic elections for the university community. 
              Cast your vote with confidence in our verified digital voting platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/student/login"
                className="w-full sm:w-auto bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 shadow-lg"
              >
                Login to Vote
              </Link>
              <Link
                to="/admin/login"
                className="w-full sm:w-auto border border-neutral-300 text-neutral-700 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors duration-200"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-success-100 rounded-full">
                  <Shield className="h-8 w-8 text-success-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Secure & Verified</h3>
              <p className="text-neutral-600">
                Every vote is cryptographically secured and verified through university email authentication.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-secondary-100 rounded-full">
                  <Users className="h-8 w-8 text-secondary-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Democratic Process</h3>
              <p className="text-neutral-600">
                Fair and transparent elections with real-time monitoring and audit capabilities.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-accent-100 rounded-full">
                  <CheckCircle className="h-8 w-8 text-accent-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Easy to Use</h3>
              <p className="text-neutral-600">
                Simple, intuitive interface designed for all users with accessibility in mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Landing;