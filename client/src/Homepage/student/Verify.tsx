import React from "react";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";
import Layout from "../../components/common/Layout";

const Verify: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 text-center">
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
                Your account has been successfully verified. You will be
                redirected to your dashboard shortly.
              </p>
              <div className="flex justify-center">
                <div className="flex items-center space-x-2 text-sm text-neutral-500">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Redirecting...</span>
                </div>
              </div>
            </>

            <div className="disabled">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-error-100 rounded-full">
                  <XCircle className="h-12 w-12 text-error-600" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                Verification Failed
              </h1>
              <p className="text-neutral-600 mb-6">Unable to be verified</p>
              <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold bg-primary-blue hover:bg-primary-700 transition-colors duration-200">
                Request New Verification Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Verify;
