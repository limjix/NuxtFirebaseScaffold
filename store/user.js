/*
 * Purpose: To be concerned only with the _user profile data
 * Author: John + Sam
 * */
import { auth, firestoreDB, persistencetype, GoogleProvider, FacebookProvider, LinkedInProvider } from "@/firebase/init.js";

//UID is also DocumentID for firestore entry fyi
export const state = () => ({
  displayName: null,
  uid: null,
  email: null,
  emailVerified: null,
  onboarded: null,
  isAnonymous: null,
  photoURL: null,
});

export const getters = {
  isAuthenticated(state) {
    console.log("UID",state.uid)
    return state.uid != null;
  },
  isEmailVerified(state) {
    return state.emailVerified != null
  },
  isOnboarded(state) {
    return state.onboarded != null
  },
  getEmail(state) {
    return state.email
  }
};

export const mutations = {
  SET_USER_AUTH(state, user) {
    //For Firebase user auth
    state.email = user.email;
    state.emailVerified = user.emailVerified;
    state.uid = user.uid;
    console.log("Set_user");
  },
  UNSET_USER_AUTH(state) {
    //For Firebase user auth
    state.email = null;
    state.emailVerified = null;
    state.uid = null;
    console.log("Unset_user");
  },

  SET_USER_DETAILS(state, userData) {
    //For other user data from firestore

  },
  UNSET_USER_DETAILS(state) {
    //For other user data from firestore

  }

};

export const actions = {
  // Use firebase SDK to switch to a login state - happens at the login page
  login({ commit, dispatch }, credentials) {
    auth.setPersistence(persistencetype);
    return auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  },

  // Use firebase sdk to switch to a signout state - happens at the logout button on the navbar
  logout({ dispatch }) {
    return auth.signOut();
  },

  signInWithGoogle({ commit }) {
    return new Promise((resolve, reject) => {
      auth.signInWithRedirect(GoogleProvider);
      resolve();
    });
  },
  signInWithFacebook({ commit }) {
    return new Promise((resolve, reject) => {
      auth.signInWithRedirect(FacebookProvider);
      resolve();
    });
  },
  signInWithLinkedIn({ commit }) {
    return new Promise((resolve, reject) => {
      auth.signInWithRedirect(LinkedInProvider);
      resolve();
    });
  },
  // Called by plugin->fireauth. When state changes, request dispatched to firestore for details of logged in _user.
  getUserData({ dispatch, commit, state }) {

    firestoreDB
      .collection("Users")
      .doc(state.uid)
      .get()
      .then(doc=>{
        let data = doc.data()
      })
      .catch((err) => {
      });

  },
};
