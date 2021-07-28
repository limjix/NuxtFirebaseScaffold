// This method negates the need to have cookies
// because all of it is handled within onAuthStateChanged listener
import { auth } from '@/firebase/init.js'

export default (context) => {
  const {store} = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(async (user) => {
      if(user) {
        console.log("logged in")
        store.commit('user/SET_USER_AUTH', user) //Commit the user as signed in
        await store.dispatch('user/getUserData') //Get the user data
      } else {
        console.log("logged out")
        store.commit('user/UNSET_USER_AUTH') //Unset the user out
        store.commit('user/UNSET_USER_DETAILS') //Unset the user details
      }
      resolve()
    })
  })
}
