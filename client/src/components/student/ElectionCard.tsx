import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, CheckCircle } from 'lucide-react';
import { formatTimeRemaining, isElectionActive } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';

interface Election {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
  candidateCount?: number;
  voteCount?: number;
}

interface ElectionCardProps {
  election: Election;
}

const ElectionCard: React.FC<ElectionCardProps> = ({ election }) => {
  const { user } = useAuth();
  const hasVoted = user?.votes?.includes(election.id);
  const active = isElectionActive(election.startsAt, election.endsAt);
  const timeRemaining = formatTimeRemaining(election.endsAt);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-neutral-900 leading-tight">
          {election.title}
        </h3>
        {hasVoted && (
          <div className="flex items-center space-x-1 text-success-600 bg-success-50 px-2 py-1 rounded-full text-xs">
            <CheckCircle className="h-3 w-3" />
            <span>Voted</span>
          </div>
        )}
      </div>

      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
        {election.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-xs text-neutral-500">
          <Calendar className="h-3 w-3" />
          <span>
            {new Date(election.startsAt).toLocaleDateString()} - {new Date(election.endsAt).toLocaleDateString()}
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-neutral-500">
          <Clock className="h-3 w-3" />
          <span className={active ? 'text-success-600' : 'text-error-600'}>
            {timeRemaining}
          </span>
        </div>

        {election.candidateCount && (
          <div className="flex items-center space-x-2 text-xs text-neutral-500">
            <Users className="h-3 w-3" />
            <span>{election.candidateCount} candidates</span>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        {active && !hasVoted ? (
          <Link
            to={`/elections/${election.id}`}
            className="flex-1 bg-primary-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
          >
            Vote Now
          </Link>
        ) : (
          <Link
            to={`/elections/${election.id}/results`}
            className="flex-1 bg-neutral-100 text-neutral-700 text-center py-2 px-4 rounded-lg font-medium hover:bg-neutral-200 transition-colors duration-200"
          >
            View Results
          </Link>
        )}
      </div>
    </div>
  );
};

export default ElectionCard;