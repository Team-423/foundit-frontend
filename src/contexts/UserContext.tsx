"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

export type UserType = "seeker" | "finder" | "guest" | null;

export interface User {
  id: string;
  name: string;
  type: UserType;
  email?: string;
}

interface UserContextType {
  user: User | null;
  userType: UserType;
  setUser: (user: User | null) => void;
  logout: () => void;
  isSeeker: boolean;
  isFinder: boolean;
  isGuest: boolean;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const setUser = useCallback((newUser: User | null) => {
    setUserState(newUser);

    if (typeof window !== "undefined") {
      try {
        if (newUser) {
          sessionStorage.setItem("currentUser", JSON.stringify(newUser));
        } else {
          sessionStorage.removeItem("currentUser");
        }
      } catch (error) {
        console.warn("SessionStorage operation failed:", error);
      }
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const savedUser = sessionStorage.getItem("currentUser");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUserState(parsedUser);
      }
    } catch (error) {
      console.warn("Error loading saved user:", error);
      try {
        sessionStorage.removeItem("currentUser");
      } catch (cleanupError) {
        console.warn("Error cleaning up sessionStorage:", cleanupError);
      }
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const userType = user?.type || null;
  const isSeeker = userType === "seeker";
  const isFinder = userType === "finder";
  const isGuest = userType === "guest";
  const isLoggedIn = user !== null;

  const contextValue: UserContextType = {
    user,
    userType,
    setUser,
    logout,
    isSeeker,
    isFinder,
    isGuest,
    isLoggedIn,
  };

  if (!isHydrated) {
    const ssrContextValue: UserContextType = {
      user: null,
      userType: null,
      setUser,
      logout,
      isSeeker: false,
      isFinder: false,
      isGuest: false,
      isLoggedIn: false,
    };

    return (
      <UserContext.Provider value={ssrContextValue}>
        {children}
      </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export const MOCK_USERS = {
  alice: {
    id: "6849846ffbfe2627b7b10ae1",
    name: "Alice",
    type: "seeker" as UserType,
    email: "alice@example.com",
  },
  bob: {
    id: "6849846ffbfe2627b7b10ae2",
    name: "Bob",
    type: "finder" as UserType,
    email: "bob@example.com",
  },
  guest: {
    id: "guest",
    name: "Guest User",
    type: "guest" as UserType,
  },
};
