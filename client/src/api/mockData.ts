import { MOCK_MODE } from '../utils/constants';

export const mockElections = [
  {
    id: '1',
    title: 'Student Union President 2025',
    description: 'Vote for your next Student Union President. This election will determine who leads student activities and represents student interests.',
    startsAt: '2025-01-15T09:00:00Z',
    endsAt: '2025-01-17T18:00:00Z',
    isActive: true,
    candidateCount: 4,
    voteCount: 1250
  },
  {
    id: '2',
    title: 'Faculty Representative Election',
    description: 'Choose your faculty representative for the Academic Board.',
    startsAt: '2025-01-20T09:00:00Z',
    endsAt: '2025-01-22T18:00:00Z',
    isActive: false,
    candidateCount: 3,
    voteCount: 890
  }
];

export const mockCandidates = {
  '1': [
    {
      id: 'c1',
      name: 'Sarah Johnson',
      manifesto: 'Committed to improving campus facilities, increasing student representation in university decisions, and organizing more cultural events.',
      photoUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 'c2',
      name: 'Michael Chen',
      manifesto: 'Focusing on mental health support, academic resource accessibility, and sustainable campus initiatives.',
      photoUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 'c3',
      name: 'Emma Davis',
      manifesto: 'Advocating for better dining options, expanded library hours, and enhanced career development programs.',
      photoUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 'c4',
      name: 'James Wilson',
      manifesto: 'Dedicated to improving campus security, creating more study spaces, and strengthening alumni networks.',
      photoUrl: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ]
};

export const mockUser = {
  id: 'u1',
  matricNo: 'UNI2025001',
  role: 'student',
  verified: true,
  votes: [] as string[]
};

export const mockAdminUser = {
  id: 'a1',
  email: 'admin@university.edu',
  role: 'admin',
  verified: true
};

export const mockStats = {
  activeElections: 2,
  totalVerifiedVoters: 3420,
  avgTurnout: 68.5
};

export const mockResults = {
  election: { id: '1', title: 'Student Union President 2025' },
  candidates: [
    { id: 'c1', name: 'Sarah Johnson', votes: 450 },
    { id: 'c2', name: 'Michael Chen', votes: 380 },
    { id: 'c3', name: 'Emma Davis', votes: 290 },
    { id: 'c4', name: 'James Wilson', votes: 130 }
  ],
  totalVotes: 1250,
  totalEligible: 3420,
  integrity: { status: 'ok' }
};

// Mock API functions
export const mockApi = {
  requestVerification: async (matricNo: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      message: 'Verification link sent successfully',
      maskedEmail: 'st****@university.edu',
      tokenSentAt: new Date().toISOString()
    };
  },

  verifyToken: async (token: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    if (token === 'invalid') {
      throw new Error('Invalid or expired token');
    }
    return {
      matricNo: 'UNI2025001',
      verified: true,
      token: 'mock-jwt-token'
    };
  },

  getMe: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUser;
  },

  adminLogin: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email !== 'admin@university.edu' || password !== 'admin123') {
      throw new Error('Invalid credentials');
    }
    return {
      token: 'mock-admin-jwt-token',
      role: 'admin'
    };
  },

  getActiveElections: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockElections.filter(e => e.isActive);
  },

  getPastElections: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockElections.filter(e => !e.isActive);
  },

  getCandidates: async (electionId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCandidates[electionId as keyof typeof mockCandidates] || [];
  },

  submitVote: async (electionId: string, candidateId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return {
      receiptHash: 'abc123def456789xyz',
      timestamp: new Date().toISOString()
    };
  },

  getResults: async (electionId: string) => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return mockResults;
  },

  getAdminStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockStats;
  },

  getAllElections: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockElections;
  },

  createElection: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: `election-${Date.now()}`,
      message: 'Election created successfully'
    };
  },

  closeElection: async (electionId: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      message: 'Election closed successfully'
    };
  }
};