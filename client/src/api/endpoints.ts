/**
 * Backend API Endpoints Documentation
 * 
 * This file documents all the API endpoints that the frontend expects.
 * Replace these mock implementations with actual backend calls.
 */

// Authentication Endpoints
export const AUTH_ENDPOINTS = {
  // Student verification request
  REQUEST_VERIFICATION: {
    method: 'POST',
    path: '/auth/request-verification',
    request: { matricNo: 'string' },
    response: { message: 'string', maskedEmail: 'string', tokenSentAt: 'timestamp' }
  },

  // Email verification
  VERIFY_TOKEN: {
    method: 'GET',
    path: '/auth/verify/:token',
    request: {},
    response: { matricNo: 'string', verified: true, token: 'string' }
  },

  // Get current user info
  GET_ME: {
    method: 'GET',
    path: '/auth/me',
    request: {},
    response: { 
      id: 'string', 
      matricNo: 'string', 
      role: 'student|admin', 
      verified: true,
      votes: ['electionId1', 'electionId2']
    }
  },

  // Admin login
  ADMIN_LOGIN: {
    method: 'POST',
    path: '/admin/login',
    request: { email: 'string', password: 'string' },
    response: { token: 'string', role: 'admin' }
  }
};

// Election Endpoints
export const ELECTION_ENDPOINTS = {
  // Get active elections
  GET_ACTIVE: {
    method: 'GET',
    path: '/elections/active',
    request: {},
    response: [{
      id: 'string',
      title: 'string',
      description: 'string',
      startsAt: 'timestamp',
      endsAt: 'timestamp',
      isActive: true
    }]
  },

  // Get past elections
  GET_PAST: {
    method: 'GET',
    path: '/elections/past',
    request: {},
    response: [{ /* same as active */ }]
  },

  // Get election candidates
  GET_CANDIDATES: {
    method: 'GET',
    path: '/elections/:id/candidates',
    request: {},
    response: [{
      id: 'string',
      name: 'string',
      manifesto: 'string',
      photoUrl: 'string'
    }]
  },

  // Submit vote
  SUBMIT_VOTE: {
    method: 'POST',
    path: '/vote',
    request: { electionId: 'string', candidateId: 'string' },
    response: { receiptHash: 'string', timestamp: 'timestamp' }
  },

  // Get election results (after close)
  GET_RESULTS: {
    method: 'GET',
    path: '/elections/results/:id',
    request: {},
    response: {
      election: { id: 'string', title: 'string' },
      candidates: [{ id: 'string', name: 'string', votes: 0 }],
      totalVotes: 0,
      totalEligible: 0,
      integrity: { status: 'ok|tampered' }
    }
  }
};

// Admin Endpoints
export const ADMIN_ENDPOINTS = {
  // Create new election
  CREATE_ELECTION: {
    method: 'POST',
    path: '/admin/create-election',
    request: {
      title: 'string',
      description: 'string',
      startsAt: 'timestamp',
      endsAt: 'timestamp',
      candidates: [{ name: 'string', manifesto: 'string', photoUrl: 'string' }]
    },
    response: { id: 'string', message: 'Election created successfully' }
  },

  // Close election
  CLOSE_ELECTION: {
    method: 'POST',
    path: '/admin/election/:id/close',
    request: {},
    response: { message: 'Election closed successfully' }
  },

  // Get admin dashboard stats
  GET_STATS: {
    method: 'GET',
    path: '/admin/stats',
    request: {},
    response: {
      activeElections: 0,
      totalVerifiedVoters: 0,
      avgTurnout: 0
    }
  },

  // Get all elections (admin view)
  GET_ALL_ELECTIONS: {
    method: 'GET',
    path: '/admin/elections',
    request: {},
    response: [{
      id: 'string',
      title: 'string',
      description: 'string',
      startsAt: 'timestamp',
      endsAt: 'timestamp',
      isActive: true,
      candidateCount: 0,
      voteCount: 0
    }]
  },

  // Upload candidate photo
  UPLOAD_PHOTO: {
    method: 'POST',
    path: '/admin/upload-candidate-photo',
    request: 'FormData with image file',
    response: { photoUrl: 'string' }
  },

  // Get vote audit log
  GET_VOTES: {
    method: 'GET',
    path: '/admin/election/:id/votes',
    request: {},
    response: [{
      id: 'string',
      candidateId: 'string',
      timestamp: 'timestamp',
      receiptHash: 'string'
    }]
  }
};