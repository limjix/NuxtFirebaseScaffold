/*
 * Purpose: To be concerned only with the _user profile data
 * Author: John + Sam
 * */
import { auth, firestoreDB, persistencetype } from "@/firebase/init.js";

//UID is also DocumentID for firestore entry fyi
export const state = () => ({
  uid: null,
  email: null,
  emailVerified: null,
  name: null
});

export const getters = {
  isAuthenticated(state) {
    console.log("UID",state.uid)
    return state.uid != null;
  },
  isEmailVerified(state) {
    return state.emailVerified != null
  },
  getEmail(state) {
    return state.email
  }
};

export const mutations = {
  SET_USER_AUTH(state, user) {
    //For Firebase data
    state.email = user.email;
    state.emailVerified = user.emailVerified;
    state.uid = user.uid;
    console.log("Set_user");
  },
  UNSET_USER_AUTH(state) {
    //For Firebase Data
    state.email = null;
    state.emailVerified = null;
    state.uid = null;
    console.log("Unset_user");
  },

  SET_USER_DETAILS(state, userData) {
    //For other user data from firestore
    state.name = userData.name
  },
  UNSET_USER_DETAILS(state) {
    //For other user data from firestore
    state.name = null
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

  // Called by plugin->fireauth. When state changes, request dispatched to firestore for details of logged in _user.
  getUserData({ dispatch, commit }) {

    firestoreDB
      .collection("Users")
      .where("email", "==", auth.currentUser.email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          commit("SET_USER_DETAILS", doc.data());
        });
        console.log("User Data Received")
      })
      .catch((err) => {
        console.log(err);
      });

  },
};
