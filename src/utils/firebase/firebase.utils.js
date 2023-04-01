import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
    
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// Firebase config from web

const firebaseConfig = {
    apiKey: "AIzaSyBx9-wbPDLavXguIz1nP0iYBSoTxMBpo8o",
    authDomain: "crwn-clothing-215ac.firebaseapp.com",
    projectId: "crwn-clothing-215ac",
    storageBucket: "crwn-clothing-215ac.appspot.com",
    messagingSenderId: "64572051987",
    appId: "1:64572051987:web:993c53c32c453be6f365e6"
};

// Set up Firebase with config

const firebaseApp = initializeApp(firebaseConfig);

// Sign-in Setup

export const auth = getAuth();

const googleProvider = new GoogleAuthProvider();

// Prompt user to select Google account (later in detail)

googleProvider.setCustomParameters({
    prompt: "select_account"
});

// Sign in functions

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// db points to Database

export const db = getFirestore();

// Create user document in Database from Google Popup Sign-in

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutAuthUser = async () => {
    await signOut(auth);
}

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback);
}