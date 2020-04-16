import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }
};

export const logout = () => ({
  type: 'LOGOUT' 
  // don't need to return anything bc its already set up
  //  that way in the reducer
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};

