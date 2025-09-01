import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import Layout from "../../components/common/Layout";
import CandidateCard from "../../components/student/CandidateCard";
import VoteConfirmationModal from "../../components/student/VoteConfirmationModal";
import Loading from "../../components/common/Loading";
import { useAuth } from "../../context/AuthContext";
import { useElection } from "../../context/ElectionContext";
import { shuffleArray, formatTimeRemaining } from "../../utils/helpers";
import { MOCK_MODE } from "../../utils/constants";
import { mockApi, mockElections } from "../../api/mockData";

const ElectionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, updateVotes } = useAuth();
  const { candidates, setCandidates, selectedCandidate, setSelectedCandidate } =
    useElection();

  const [election, setElection] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shuffledCandidates, setShuffledCandidates] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      fetchElectionData(id);
    }
  }, [id]);

  useEffect(() => {
    // Shuffle candidates for this session to minimize positional bias
    if (candidates.length > 0) {
      setShuffledCandidates(shuffleArray(candidates));
    }
  }, [candidates]);

  const fetchElectionData = async (electionId: string) => {
    setLoading(true);
    try {
      // Get election details
      const electionData = mockElections.find((e) => e.id === electionId);
      setElection(electionData);

      let candidatesResponse;

      if (MOCK_MODE) {
        candidatesResponse = await mockApi.getCandidates(electionId);
      } else {
        // GET /elections/:id/candidates
        // Response: [{ id, name, manifesto, photoUrl }]
        const res = await fetch(`/api/elections/${electionId}/candidates`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("univote_token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch candidates");
        candidatesResponse = await res.json();
      }

      setCandidates(candidatesResponse);
    } catch (error) {
      console.error("Error fetching election data:", error);
      toast.error("Failed to load election data");
    } finally {
      setLoading(false);
    }
  };

  const handleVoteSubmit = async () => {
    if (!selectedCandidate || !id) return;

    setIsSubmitting(true);
    try {
      let response;

      if (MOCK_MODE) {
        response = await mockApi.submitVote(id, selectedCandidate);
      } else {
        // POST /vote
        // Request: { electionId, candidateId }
        // Response: { receiptHash, timestamp }
        const res = await fetch("/api/vote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("univote_token")}`,
          },
          body: JSON.stringify({
            electionId: id,
            candidateId: selectedCandidate,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          if (res.status === 409) {
            throw new Error("You have already voted in this election");
          }
          throw new Error(errorData.message || "Failed to submit vote");
        }

        response = await res.json();
      }

      updateVotes(id);
      setShowConfirmModal(false);

      navigate(`/vote-confirmation`, {
        state: {
          electionTitle: election?.title,
          candidateName: shuffledCandidates.find(
            (c) => c.id === selectedCandidate
          )?.name,
          receiptHash: response.receiptHash,
          timestamp: response.timestamp,
        },
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit vote"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasVoted = user?.votes?.includes(id || "");

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading message="Loading election details..." />
        </div>
      </Layout>
    );
  }

  if (!election) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">
              Election Not Found
            </h1>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-primary-600 hover:text-primary-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-800 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">
              {election.title}
            </h1>
            <p className="text-neutral-600 mb-4">{election.description}</p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2 text-neutral-500">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(election.startsAt).toLocaleDateString()} -{" "}
                  {new Date(election.endsAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-500">
                <Users className="h-4 w-4" />
                <span>{shuffledCandidates.length} candidates</span>
              </div>
              <div className="text-primary-600 font-medium">
                {formatTimeRemaining(election.endsAt)}
              </div>
            </div>

            {hasVoted && (
              <div className="mt-4 p-3 bg-success-50 border border-success-200 rounded-lg">
                <p className="text-success-800 font-medium">
                  You have already voted in this election
                </p>
              </div>
            )}
          </div>
        </div>

        {hasVoted ? (
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Thank you for voting!
            </h2>
            <p className="text-neutral-600 mb-6">
              Results will be visible after the election closes.
            </p>
            <button
              onClick={() => navigate(`/elections/${id}/results`)}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              View Results
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Select Your Candidate
              </h2>
              <p className="text-neutral-600 text-sm">
                Choose one candidate below. Candidates are displayed in random
                order to ensure fairness.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {shuffledCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  selected={selectedCandidate === candidate.id}
                  onSelect={setSelectedCandidate}
                />
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowConfirmModal(true)}
                disabled={!selectedCandidate}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Submit Vote
              </button>
            </div>
          </>
        )}

        <VoteConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleVoteSubmit}
          candidate={
            shuffledCandidates.find((c) => c.id === selectedCandidate) || null
          }
          electionTitle={election.title}
          isSubmitting={isSubmitting}
        />
      </div>
    </Layout>
  );
};

export default ElectionDetails;
