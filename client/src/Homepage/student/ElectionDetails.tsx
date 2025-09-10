import { ArrowLeft } from "lucide-react";
import Layout from "../../components/common/Layout";
import ivoteeImg from "./download.png";

const ElectionDetails: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-800 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>

          {/* ALREADY VOTED */}
          {/* <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">
              Student Union President
            </h1>
            <p className="text-neutral-600 mb-4">election 24/25 </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2 text-neutral-500">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date().toLocaleDateString()} -{" "}
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-500">
                <Users className="h-4 w-4" />
                <span>4 candidates</span>
              </div>
              <div className="text-primary-600 font-medium">
                Time Remaining - 4hrs
              </div>
            </div>

            <div className="mt-4 p-3 bg-success-50 border border-success-200 rounded-lg">
              <p className="text-success-800 font-medium">
                You have already voted in this election
              </p>
            </div>
          </div> */}
        </div>

        {/* confirmation */}
        {/* <div className="disabled popup bg-white rounded-xl shadow-sm border text-center mx-auto w-full border-neutral-200 p-6 mb-8">
          <h1 className="text-lg ">Vote is irreversible</h1>
          <h2 className="text-error-600">Are you Sure?</h2>
          <button className="mt-4 px-2 py-2 rounded-md bg-primary-blue">
            Submit vote
          </button>
        </div> */}

        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Select Your Candidate
            </h2>
            <p className="text-neutral-600 text-sm">
              Choose one candidate below. Candidates are displayed in random
              order to ensure fairness.
            </p>
            <div className="mb-6 grid grid-rows-1">
              <div className="bg-white rounded-xl shadow-sm border flex w-full border-neutral-200 p-6 mb-8">
                {/* profile picture of candidates */}
                <img src={ivoteeImg} alt="profile-picture" className="w-20" />
                <h1 className=" font-bold text-neutral-900 mb-4 mx-3 mt-5">
                  John Doe
                  <span className="block font-medium text-neutral-700 w-26">
                    Vote for a greater Faculty
                  </span>
                </h1>
                <input
                  type="checkbox"
                  name="vote"
                  id="#"
                  className="w-6 votingbtn"
                />
              </div>

              <div className="bg-white rounded-xl shadow-sm border flex w-full border-neutral-200 p-6 mb-8">
                {/* profile picture of candidates */}
                <img src={ivoteeImg} alt="profile-picture" className="w-20" />
                <h1 className=" font-bold text-neutral-900 mb-4 mx-3 mt-5">
                  Sam Smith
                  <span className="block font-medium text-neutral-700 w-26">
                    Change is imminent
                  </span>
                </h1>
                <input
                  type="checkbox"
                  name="vote"
                  id="#"
                  className="w-6 justify-end votingbtn"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ElectionDetails;
