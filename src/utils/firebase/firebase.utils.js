import { initializeApp} from 'firebase/app';
import { getAuth,
        signInWithRedirect,
        signInWithPopup, 
        GoogleAuthProvider } 
        from 'firebase/auth';

        import {
          getFirestore,
          doc,
          getDoc,
          setDoc

        } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBOABfd18hUvLYfwd67dQFNSQvr6sQYkLc",
    authDomain: "crwn-clothing-db-5778c.firebaseapp.com",
    projectId: "crwn-clothing-db-5778c",
    storageBucket: "crwn-clothing-db-5778c.appspot.com",
    messagingSenderId: "404371205989",
    appId: "1:404371205989:web:be75c2fcac94c97ef57b8c"
  };
  
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt:"select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

   const userSnapshot = await getDoc(userDocRef);
   

    if(!userSnapshot.exists()){
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }



    }
    return userDocRef;


  };