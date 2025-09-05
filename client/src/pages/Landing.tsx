import React from "react";
import ivoteeImg from "./ivotee-icon-png.png";
import { Link } from "react-router-dom";
import { Vote, Shield, Users, CheckCircle } from "lucide-react";
import Layout from "../components/common/Layout";

const Landing: React.FC = () => {
  return (
    <Layout>
      <div className="fullLayout min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 mb-8">
        {/* Hero Section */}
        <div className="max-w-7xl heroHeader mx-auto">
          <div className="text-center">
            <img
              src={ivoteeImg}
              className="mx-auto mb-0 projectImg"
              alt="project logo"
            />

            <h1 className="projectName text-4xl md:text-5xl font-bold text-neutral-900  mb-2">
              Welcome to ivotee
            </h1>

            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto px-4">
              Smart, Secure, Student-powered. iVotee makes university elections
              transparent and trustworthy- giving every smart student the
              confidence to vote digitally
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/student/login"
                className="loginBtn w-full sm:w-auto bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 shadow-lg"
              >
                Login to Vote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
