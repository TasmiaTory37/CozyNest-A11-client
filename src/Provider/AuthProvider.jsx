import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile, // ✅ Added this line
} from 'firebase/auth';
import app from '../firebase/firebase.config';

const auth = getAuth(app);
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // ✅ Create new user with profile update
  const createNewUser = async (email, password, name, photoURL) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Update display name and photoURL
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      return userCredential;
    } catch (error) {
      console.error("Error creating user: ", error);
      throw error;
    }
  };

  // Sign in with Google
  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      console.error("Google Sign-in Error: ", error);
      throw error;
    }
  };

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        localStorage.setItem('user', JSON.stringify(currentUser));
        try {
          const idToken = await currentUser.getIdToken();
          setToken(idToken);
        } catch (err) {
          console.error("Failed to get ID token:", err);
        }
      } else {
        localStorage.removeItem('user');
        setToken(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔄 Refresh token if user exists on page reload
  useEffect(() => {
    const refreshToken = async () => {
      if (auth.currentUser) {
        try {
          const idToken = await auth.currentUser.getIdToken();
          setToken(idToken);
          setUser(auth.currentUser);
        } catch (error) {
          console.error("Error refreshing token on reload:", error);
        }
      }
      setLoading(false);
    };

    refreshToken();
  }, []);

  // Login with email/password
  const userLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Error logging in: ", error);
      throw error;
    }
  };

  // Log out
  const logOut = async () => {
    try {
      await signOut(auth);
      setToken(null);
    } catch (error) {
      console.error("Error logging out: ", error);
      throw error;
    }
  };

  const info = {
    user,
    token,
    loading,
    setUser,
    logOut,
    userLogin,
    createNewUser, // ✅ Now expects: (email, password, name, photoURL)
    handleGoogle,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
