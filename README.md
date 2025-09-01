# UniVote - University E-Voting System

A secure, transparent, and user-friendly electronic voting platform designed specifically for university elections. Built with React, Vite, and Tailwind CSS.

## Features

### Student Features
- **Email Verification**: Secure authentication using university matric numbers
- **Active Elections**: View and participate in ongoing elections
- **Candidate Selection**: Randomized candidate display to prevent positional bias
- **Vote Confirmation**: Secure voting with cryptographic receipt generation
- **Results Viewing**: Access election results after closing
- **Vote History**: Track participation in past elections

### Admin Features
- **Election Management**: Create, configure, and close elections
- **Candidate Management**: Add candidates with photos and manifestos
- **Real-time Monitoring**: Track voter turnout and election status
- **Results Analysis**: Comprehensive results with charts and export options
- **Integrity Verification**: Cryptographic verification of election integrity

## Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Demo Mode
The app includes a mock mode for demonstration purposes. To enable:

1. Open `src/utils/constants.ts`
2. Set `MOCK_MODE = true`
3. Use demo credentials provided in the UI

## Project Structure

```
src/
├── api/              # API integration and mock data
├── components/       # Reusable UI components
│   ├── common/       # Shared components (Layout, Header, Footer)
│   ├── student/      # Student-specific components
│   └── admin/        # Admin-specific components
├── context/          # React Context providers
├── pages/            # Page components organized by user role
│   ├── student/      # Student-facing pages
│   └── admin/        # Admin-facing pages
├── utils/            # Utility functions and constants
└── main.tsx         # Application entry point
```

## User Flows

### Student Flow
1. **Login**: Enter matric number → Receive verification email
2. **Verification**: Click email link → Account verified
3. **Dashboard**: View active/past elections
4. **Voting**: Select candidate → Confirm vote → Receive receipt
5. **Results**: View results after election closes

### Admin Flow
1. **Login**: Email/password authentication
2. **Dashboard**: Overview of elections and statistics
3. **Create Election**: Add candidates and set election period
4. **Monitor**: Track voting progress and turnout
5. **Close Election**: End voting and publish results

## Backend Integration

The frontend is designed to integrate with a RESTful backend API. All API calls are implemented with proper error handling and loading states.

### Authentication Endpoints

#### Student Verification Request
```
POST /auth/request-verification
Request: { matricNo: string }
Response: { message: string, maskedEmail: string, tokenSentAt: timestamp }
```

#### Email Verification
```
GET /auth/verify/:token
Request: {}
Response: { matricNo: string, verified: true, token: string }
```

#### Get Current User
```
GET /auth/me
Request: {}
Response: { 
  id: string, 
  matricNo: string, 
  role: 'student'|'admin', 
  verified: boolean,
  votes: string[]
}
```

#### Admin Login
```
POST /admin/login
Request: { email: string, password: string }
Response: { token: string, role: 'admin' }
```

### Election Endpoints

#### Get Active Elections
```
GET /elections/active
Request: {}
Response: [{
  id: string,
  title: string,
  description: string,
  startsAt: timestamp,
  endsAt: timestamp,
  isActive: boolean
}]
```

#### Get Past Elections
```
GET /elections/past
Request: {}
Response: [Election[]] (same structure as active)
```

#### Get Election Candidates
```
GET /elections/:id/candidates
Request: {}
Response: [{
  id: string,
  name: string,
  manifesto: string,
  photoUrl: string
}]
```

#### Submit Vote
```
POST /vote
Request: { electionId: string, candidateId: string }
Response: { receiptHash: string, timestamp: timestamp }
```

#### Get Election Results
```
GET /elections/results/:id
Request: {}
Response: {
  election: { id: string, title: string },
  candidates: [{ id: string, name: string, votes: number }],
  totalVotes: number,
  totalEligible: number,
  integrity: { status: 'ok'|'tampered' }
}
```

### Admin Endpoints

#### Create Election
```
POST /admin/create-election
Request: {
  title: string,
  description: string,
  startsAt: timestamp,
  endsAt: timestamp,
  candidates: [{ name: string, manifesto: string, photoUrl: string }]
}
Response: { id: string, message: string }
```

#### Close Election
```
POST /admin/election/:id/close
Request: {}
Response: { message: string }
```

#### Get Admin Statistics
```
GET /admin/stats
Request: {}
Response: {
  activeElections: number,
  totalVerifiedVoters: number,
  avgTurnout: number
}
```

#### Get All Elections (Admin View)
```
GET /admin/elections
Request: {}
Response: [{
  id: string,
  title: string,
  description: string,
  startsAt: timestamp,
  endsAt: timestamp,
  isActive: boolean,
  candidateCount: number,
  voteCount: number
}]
```

#### Upload Candidate Photo
```
POST /admin/upload-candidate-photo
Request: FormData with image file
Response: { photoUrl: string }
```

#### Get Vote Audit Log
```
GET /admin/election/:id/votes
Request: {}
Response: [{
  id: string,
  candidateId: string,
  timestamp: timestamp,
  receiptHash: string
}]
```

## Security Considerations

### Frontend Security
- **Token Storage**: Uses localStorage for demo; recommend HTTP-only cookies for production
- **Route Protection**: Role-based route guards prevent unauthorized access
- **Input Validation**: Client-side validation with server-side verification expected
- **CSRF Protection**: Ready for CSRF token implementation

### Expected Backend Security
- **Email Verification**: Unique tokens with expiration
- **Vote Integrity**: Cryptographic hashing for tamper detection
- **Rate Limiting**: Prevent spam and abuse
- **Audit Logging**: Complete vote audit trail
- **Row-Level Security**: Database-level access controls

## Development Notes

### Mock Mode
Set `MOCK_MODE = true` in `src/utils/constants.ts` for demo functionality with simulated API responses.

### Styling
- **Design System**: Comprehensive color palette with semantic meanings
- **Responsive**: Mobile-first approach with progressive enhancement
- **Accessibility**: WCAG 2.1 AA compliance ready
- **Performance**: Optimized bundle with code splitting

### Testing
All components are built with testing in mind:
- Predictable state management with Context
- Separated business logic in utility functions
- Mock data for consistent testing scenarios

## Production Deployment

### Environment Variables
```
VITE_API_BASE_URL=https://api.university.edu
VITE_APP_ENV=production
```

### Build
```bash
npm run build
```

### Security Checklist
- [ ] Configure HTTP-only cookies for token storage
- [ ] Implement proper CORS policies
- [ ] Add rate limiting on sensitive endpoints
- [ ] Enable HTTPS everywhere
- [ ] Configure CSP headers
- [ ] Implement session timeout
- [ ] Add audit logging
- [ ] Verify email deliverability

## Support

For technical support or feature requests, contact the development team or refer to the university IT department.

---

**UniVote** - Secure • Transparent • Democratic