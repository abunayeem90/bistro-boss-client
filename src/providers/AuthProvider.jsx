import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext(null)
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import {app} from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser]= useState(null);
    const [loading, setLoading] = useState(true);
    
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email , password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }
    
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: photo
        })
       

    }

    // onAuthStateChange
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, currentUser => {
//       console.log(currentUser);
//     //   console.log(user);
//         setUser(currentUser)
//       setLoading(false)
//     })
//     return () => {
//       return unsubscribe()
//     }
//   }, [])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('Current User', currentUser);
            if(currentUser){
                // get token and store client
                const userInfo = {email: currentUser.email};
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    console.log(res.data);
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        // setLoading(false);
                    }
                })
            }
            else{
                //TODO: remove token (if token stored in the client side: local storage, caching, in memory)
                localStorage.removeItem('access-token')
                // setLoading(false);
            }
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    },[axiosPublic])

    const authInfo = {
        user, loading, createUser, setUser,signIn, logOut, updateUserProfile, googleSignIn

    }


    return (
        <AuthContext.Provider  value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;