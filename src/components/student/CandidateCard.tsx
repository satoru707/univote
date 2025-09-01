import React from 'react';

interface Candidate {
  id: string;
  name: string;
  manifesto: string;
  photoUrl: string;
}

interface CandidateCardProps {
  candidate: Candidate;
  selected: boolean;
  onSelect: (candidateId: string) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, selected, onSelect }) => {
  return (
    <div
      className={`
        bg-white rounded-xl border-2 p-6 cursor-pointer transition-all duration-200
        ${selected 
          ? 'border-primary-500 shadow-lg ring-2 ring-primary-100' 
          : 'border-neutral-200 hover:border-neutral-300 hover:shadow-md'
        }
      `}
      onClick={() => onSelect(candidate.id)}
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={candidate.photoUrl}
            alt={candidate.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-neutral-200"
          />
          {selected && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            {candidate.name}
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {candidate.manifesto}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-100">
        <div className={`
          inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
          ${selected 
            ? 'bg-primary-100 text-primary-700' 
            : 'bg-neutral-100 text-neutral-600'
          }
        `}>
          {selected ? 'Selected' : 'Click to select'}
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;