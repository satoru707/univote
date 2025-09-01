/**
 * Mock Data Generator for UniVote System
 * 
 * This script generates realistic mock data for testing and demonstration purposes.
 * Run this script to populate the system with sample elections and candidates.
 */

const fs = require('fs');
const path = require('path');

// Sample data generators
const generateElections = () => {
  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
  const pastDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago

  return [
    {
      id: 'election-1',
      title: 'Student Union President 2025',
      description: 'Vote for your next Student Union President. This election will determine who leads student activities, represents student interests to university administration, and manages the student union budget for the upcoming academic year.',
      startsAt: new Date(currentDate.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Started yesterday
      endsAt: new Date(futureDate.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Ends in 9 days
      isActive: true,
      candidateCount: 4,
      voteCount: 1250
    },
    {
      id: 'election-2',
      title: 'Faculty of Engineering Representative',
      description: 'Choose your faculty representative for the Academic Board. This position involves advocating for engineering students in curriculum decisions and academic policy changes.',
      startsAt: new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(), // Starts in 3 days
      endsAt: new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(), // Ends in 5 days
      isActive: false,
      candidateCount: 3,
      voteCount: 0
    },
    {
      id: 'election-3',
      title: 'Sports Committee Chair 2024',
      description: 'Past election for the Sports Committee Chair position.',
      startsAt: pastDate.toISOString(),
      endsAt: new Date(pastDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: false,
      candidateCount: 2,
      voteCount: 890
    }
  ];
};

const generateCandidates = () => {
  return {
    'election-1': [
      {
        id: 'candidate-1a',
        name: 'Sarah Johnson',
        manifesto: 'Committed to improving campus facilities, increasing student representation in university decisions, and organizing more cultural events. My platform focuses on mental health support, academic resource accessibility, and creating a more inclusive campus environment for all students.',
        photoUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        id: 'candidate-1b',
        name: 'Michael Chen',
        manifesto: 'Focusing on mental health support, academic resource accessibility, and sustainable campus initiatives. I believe in transparent leadership, regular student feedback sessions, and working closely with faculty to improve the overall student experience.',
        photoUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        id: 'candidate-1c',
        name: 'Emma Davis',
        manifesto: 'Advocating for better dining options, expanded library hours, and enhanced career development programs. My goal is to bridge the gap between students and administration while promoting diversity and inclusion across all university activities.',
        photoUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        id: 'candidate-1d',
        name: 'James Wilson',
        manifesto: 'Dedicated to improving campus security, creating more study spaces, and strengthening alumni networks. I will work tirelessly to ensure student voices are heard in university policy decisions and budget allocations.',
        photoUrl: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300'
      }
    ],
    'election-2': [
      {
        id: 'candidate-2a',
        name: 'Dr. Alex Kumar',
        manifesto: 'Experienced engineering student advocate with focus on curriculum modernization and industry partnerships.',
        photoUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        id: 'candidate-2b',
        name: 'Lisa Thompson',
        manifesto: 'Promoting hands-on learning opportunities and improving lab facilities for engineering students.',
        photoUrl: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        id: 'candidate-2c',
        name: 'Robert Martinez',
        manifesto: 'Advocating for better internship programs and stronger connections with tech industry partners.',
        photoUrl: 'https://images.pexels.com/photos/1181684/pexels-photo-1184684.jpeg?auto=compress&cs=tinysrgb&w=300'
      }
    ],
    'election-3': [
      {
        id: 'candidate-3a',
        name: 'Jessica Lee',
        manifesto: 'Former athlete committed to expanding sports programs and improving athletic facilities.',
        photoUrl: 'https://images.pexels.com/photos/1181707/pexels-photo-1181707.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        id: 'candidate-3b',
        name: 'David Brown',
        manifesto: 'Focus on inclusive sports programs and increasing participation across all student demographics.',
        photoUrl: 'https://images.pexels.com/photos/1181712/pexels-photo-1181712.jpeg?auto=compress&cs=tinysrgb&w=300'
      }
    ]
  };
};

const generateMockUsers = () => {
  return [
    {
      id: 'student-1',
      matricNo: 'UNI2025001',
      role: 'student',
      verified: true,
      votes: ['election-3'] // Voted in past election
    },
    {
      id: 'student-2',
      matricNo: 'UNI2025002',
      role: 'student',
      verified: true,
      votes: []
    },
    {
      id: 'admin-1',
      email: 'admin@university.edu',
      role: 'admin',
      verified: true
    }
  ];
};

const generateMockStats = () => {
  return {
    activeElections: 1,
    totalVerifiedVoters: 3420,
    avgTurnout: 68.5,
    lastUpdated: new Date().toISOString()
  };
};

const generateMockResults = () => {
  return {
    'election-3': {
      election: { id: 'election-3', title: 'Sports Committee Chair 2024' },
      candidates: [
        { id: 'candidate-3a', name: 'Jessica Lee', votes: 520 },
        { id: 'candidate-3b', name: 'David Brown', votes: 370 }
      ],
      totalVotes: 890,
      totalEligible: 3420,
      integrity: { status: 'ok', verifiedAt: new Date().toISOString() }
    }
  };
};

// Generate and save mock data
const generateAll = () => {
  const mockData = {
    elections: generateElections(),
    candidates: generateCandidates(),
    users: generateMockUsers(),
    stats: generateMockStats(),
    results: generateMockResults(),
    generatedAt: new Date().toISOString()
  };

  // Ensure directory exists
  const outputDir = path.join(__dirname, '..', 'src', 'api');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to file
  const outputPath = path.join(outputDir, 'generatedMockData.json');
  fs.writeFileSync(outputPath, JSON.stringify(mockData, null, 2));

  console.log('✅ Mock data generated successfully!');
  console.log(`📁 Saved to: ${outputPath}`);
  console.log(`📊 Generated:`);
  console.log(`   - ${mockData.elections.length} elections`);
  console.log(`   - ${Object.keys(mockData.candidates).length} candidate sets`);
  console.log(`   - ${mockData.users.length} users`);
  console.log(`   - 1 stats object`);
  console.log(`   - ${Object.keys(mockData.results).length} result sets`);
};

// CLI usage
if (require.main === module) {
  generateAll();
}

module.exports = {
  generateElections,
  generateCandidates,
  generateMockUsers,
  generateMockStats,
  generateMockResults,
  generateAll
};