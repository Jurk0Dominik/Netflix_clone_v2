import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  // loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  // loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  // Persisting the user
  useEffect(
    () =>
      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          // Logged in...
          setUser(user);
          // setLoading(false);
        } else {
          // Not logged in...
          setUser(null);
          // setLoading(true);
          navigate("/");
        }

        setInitialLoading(false);
      }),
    [firebaseAuth]
  );

  const signUp = async (email: string, password: string) => {
    // setLoading(true);

    await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        navigate("/payment");
        // setLoading(false);
      })
      .catch((error) => alert(error.message));
    // .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    // setLoading(true);

    await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        navigate("/main");
        // setLoading(false);
      })
      .catch((error) => alert(error.message));
    // .finally(() => setLoading(false));
  };

  const logout = async () => {
    // setLoading(true);

    signOut(firebaseAuth)
      .then(() => {
        setUser(null);
        navigate("/login");
      })
      .catch((error) => alert(error.message));
    // .finally(() => setLoading(false));
  };

  // const subscribePlan = () => {};

  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      // loading,
      logout,
      error,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
