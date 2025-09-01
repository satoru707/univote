import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Vote, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Vote className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-neutral-900">UniVote</span>
          </Link>

          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-neutral-600">
                <User className="h-4 w-4" />
                <span>
                  {isAdmin ? user?.email : user?.matricNo}
                  <span className="ml-1 text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                    {user?.role}
                  </span>
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-neutral-600 hover:text-neutral-800 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;