import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-sm text-neutral-600">
          <p>&copy; 2025 University E-Voting System. All rights reserved.</p>
          <p className="mt-1">Secure • Transparent • Democratic</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;