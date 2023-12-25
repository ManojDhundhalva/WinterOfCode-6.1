import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    query,
    where,
    onSnapshot
} from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,

} from 'firebase/auth'

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyAWapgfb1fxl1C_fjZScHxse0TVJ2B1LF8",
    authDomain: "winterofcode-irctc.firebaseapp.com",
    projectId: "winterofcode-irctc",
    storageBucket: "winterofcode-irctc.appspot.com",
    messagingSenderId: "835241202381",
    appId: "1:835241202381:web:a486b5cd877d093e36cf84",
    measurementId: "G-6MFD64JDJ6"
};
export const useFirebase = () => { return useContext(FirebaseContext); }

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

const db = getFirestore();
const colRef = collection(db, 'User');

// getDocs(colRef).then((snapshot) => {
//     let books = [];
//     snapshot.forEach((doc) => {
//         books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
// }).catch((error) => {
//     console.error('Error getting documents:', error);
// });


export const FirebaseProvider = (props) => {

    const navigate = useNavigate();
    const loggedIN = window.localStorage.getItem("ISLoggedIN");
    const localEmail = window.localStorage.getItem("LocalEmail");
    const localPassword = window.localStorage.getItem("LocalPassword");
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [UserID, setUserID] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) setUser(user);
            else setUser(null);
        });

        return () => unsubscribe();
    }, [firebaseAuth]);

    const signupWithEmailAndPassword = (email, password) => {
        createUserWithEmailAndPassword(firebaseAuth, email, password).then((cred) => {
            console.log('user Register in:', cred.user.email);
            setIsLoggedIn(true);
            window.localStorage.setItem("ISLoggedIN", true);
            window.localStorage.setItem("LocalEmail", email);
            window.localStorage.setItem("LocalPassword", password);
            const myData = {

                Address: "India",
                ContactNo: "9999999999",
                DOB: "01-01-2024",
                EmailId: cred.user.email,
                FirstName: "Guest",
                LastName: "Guest",
                MiddleName: "Guest",
                State: "Gujarat",
                UseName: "Guest",
                isMale: true
            }
            addDoc(colRef,
                myData
            )
                .then(() => {
                    console.log('added');
                })

        })
            .catch((err) => {
                console.log(err.message);
                setIsLoggedIn(false);
            });
    }

    const signinUserWithPassword = async (email, password) => {
        await signInWithEmailAndPassword(firebaseAuth, email, password).then((cred) => {
            console.log('user logged in:', cred.user.email);
            setIsLoggedIn(true);
            window.localStorage.setItem("ISLoggedIN", true);
            window.localStorage.setItem("LocalEmail", email);
            window.localStorage.setItem("LocalPassword", password);

        })
            .catch((err) => {
                console.log(err.message);
                setIsLoggedIn(false);
            });
    }


    const signinWithGoogle = () => {
        signInWithPopup(firebaseAuth, googleProvider).then((cred) => {
            console.log('user logged in:', cred.user);
            setIsLoggedIn(true);
        })
            .catch((err) => {
                console.log(err.message);
                setIsLoggedIn(false);
            });
    };

    useEffect(() => {
        console.log('isLoggedIn', isLoggedIn);
        if (loggedIN == null) {
            setIsLoggedIn(false);
        }
        else {
            signinUserWithPassword(localEmail, localPassword);
            setIsLoggedIn(true);
        }
        console.log('kjhgfdxz', loggedIN);
        console.log('1', localEmail);
        console.log('2', localPassword);
        // if (!isLoggedIn) {
        // navigate("/login");
        // }

    }, [isLoggedIn]);

    return (
        <FirebaseContext.Provider
            value={{
                signupWithEmailAndPassword,
                signinUserWithPassword,
                signinWithGoogle,
                setIsLoggedIn,
                isLoggedIn,
                UserID,
                setUserID
            }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}