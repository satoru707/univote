import React from "react";
import { CheckCircle, Download } from "lucide-react";
import Layout from "../../components/common/Layout";

const VoteConfirmation: React.FC = () => {
  const downloadReceipt = () => {
    const receiptContent = `
UNIVERSITY E-VOTING RECEIPT
==========================

Election: Student Union President
Candidate: John Doe
Timestamp: ${new Date().toLocaleString()}
Receipt Code: ######
Full Hash: here is your hash

This receipt confirms your vote was successfully recorded.
Results will be visible after the election closes.

UniVote - University E-Voting System
    `.trim();

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-success-100 rounded-full">
                <CheckCircle className="h-12 w-12 text-success-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-neutral-900 mb-4">
              Vote Submitted Successfully!
            </h1>

            <div className="bg-neutral-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-neutral-900 mb-3">
                Vote Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-neutral-600">Election:</span>
                  <p className="font-medium text-neutral-900">
                    Student Union President
                  </p>
                </div>
                <div>
                  <span className="text-neutral-600">Candidate:</span>
                  <p className="font-medium text-neutral-900">John Doe</p>
                </div>
                <div>
                  <span className="text-neutral-600">Timestamp:</span>
                  <p className="font-medium text-neutral-900">
                    {new Date().toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-neutral-600">Receipt Code:</span>
                  <p className="font-mono font-bold text-primary-600 text-lg">
                    ###########
                  </p>
                </div>
              </div>
            </div>

            <p className="text-neutral-600 text-sm mb-6">
              Results will be visible only after the election is closed.
            </p>

            <div className="space-y-3">
              <button
                onClick={downloadReceipt}
                className="w-full bg-neutral-100 text-neutral-700 py-3 px-4 rounded-lg font-medium hover:bg-neutral-200 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Receipt</span>
              </button>

              <button
                onClick={() => "/dashboard"}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VoteConfirmation;
