import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  matricNo?: string;
  email?: string;
  role: "student" | "admin";
  verified: boolean;
  votes?: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  updateVotes: (electionId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedToken = localStorage.getItem("univote_token");
    const savedUser = localStorage.getItem("univote_user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem("univote_token");
        localStorage.removeItem("univote_user");
      }
    }
  }, []);

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);

    // Note: In production, use HTTP-only cookies for security
    localStorage.setItem("univote_token", newToken);
    localStorage.setItem("univote_user", JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("univote_token");
    localStorage.removeItem("univote_user");
  };

  const updateVotes = (electionId: string) => {
    if (user && user.votes) {
      const updatedUser = {
        ...user,
        votes: [...user.votes, electionId],
      };
      setUser(updatedUser);
      localStorage.setItem("univote_user", JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.role === "admin",
    isStudent: user?.role === "student",
    updateVotes,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
