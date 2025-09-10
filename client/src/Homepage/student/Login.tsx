import { Link } from "react-router";
import { ArrowLeft, Send } from "lucide-react";
import Layout from "../../components/common/Layout";

function StudentLogin() {
  return (
    <Layout>
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-primary-blue mb-2">
                Login
              </h1>
              <p className="text-neutral-600">
                Enter your matric number to receive a verification link
              </p>
            </div>

            <form
              className="space-y-6"
              action={() => {
                const verified = document.querySelector(".disabled");
                verified?.classList.remove("disabled");
              }}
            >
              <div>
                <label
                  htmlFor="matricNo"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Matric Number
                </label>
                <input
                  type="text"
                  id="matricNo"
                  value="#"
                  placeholder="e.g., UNI2025001"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold bg-primary-blue transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Sending Verification link</span>
              </button>
            </form>

            {
              <div className="mt-6 p-4 bg-success-50 disabled border border-success-200 rounded-lg">
                <p className="text-sm text-success-800">
                  Verification link sent to <strong>you</strong>
                </p>
                <p className="text-xs text-success-700 mt-1">
                  Check your university email and click the link to verify your
                  account.
                </p>
              </div>
            }

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
}

export default StudentLogin;
