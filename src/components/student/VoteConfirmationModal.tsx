import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  manifesto: string;
  photoUrl: string;
}

interface VoteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  candidate: Candidate | null;
  electionTitle: string;
  isSubmitting: boolean;
}

const VoteConfirmationModal: React.FC<VoteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  candidate,
  electionTitle,
  isSubmitting
}) => {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-neutral-900">Confirm Your Vote</h3>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-2 text-warning-600 bg-warning-50 p-3 rounded-lg mb-4">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-sm font-medium">This action cannot be undone</span>
          </div>

          <p className="text-sm text-neutral-600 mb-4">
            You are about to cast your vote for <strong>{electionTitle}</strong>
          </p>

          <div className="bg-neutral-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium text-neutral-900">{candidate.name}</h4>
                <p className="text-xs text-neutral-600 line-clamp-2">
                  {candidate.manifesto}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Vote'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoteConfirmationModal;