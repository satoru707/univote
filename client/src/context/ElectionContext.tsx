import React, { createContext, useContext, useState, ReactNode } from 'react';

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

interface Candidate {
  id: string;
  name: string;
  manifesto: string;
  photoUrl: string;
}

interface ElectionContextType {
  elections: Election[];
  candidates: Candidate[];
  selectedCandidate: string | null;
  setElections: (elections: Election[]) => void;
  setCandidates: (candidates: Candidate[]) => void;
  setSelectedCandidate: (candidateId: string | null) => void;
  clearElectionData: () => void;
}

const ElectionContext = createContext<ElectionContextType | undefined>(undefined);

export const useElection = () => {
  const context = useContext(ElectionContext);
  if (context === undefined) {
    throw new Error('useElection must be used within an ElectionProvider');
  }
  return context;
};

interface ElectionProviderProps {
  children: ReactNode;
}

export const ElectionProvider: React.FC<ElectionProviderProps> = ({ children }) => {
  const [elections, setElections] = useState<Election[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  const clearElectionData = () => {
    setCandidates([]);
    setSelectedCandidate(null);
  };

  const value: ElectionContextType = {
    elections,
    candidates,
    selectedCandidate,
    setElections,
    setCandidates,
    setSelectedCandidate,
    clearElectionData
  };

  return (
    <ElectionContext.Provider value={value}>
      {children}
    </ElectionContext.Provider>
  );
};