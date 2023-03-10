import React, { useState, useEffect, useDebugValue } from "react";
import { useNavigate } from "react-router-dom";

import "./SignIn.css";
import { Setup } from "../Setup/Setup";

import logo from "../../../Assets/logo.svg";
import logoBig from "../../../Assets/logoBig.svg";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { fetchSignInMethodsForEmail } from "firebase/auth";

firebase.initializeApp({
    apiKey: "AIzaSyAeeTvV_czzoX_qxVOgRMxrE1aNEo6SMgQ",
    authDomain: "campusroute-ca268.firebaseapp.com",
    projectId: "campusroute-ca268",
    storageBucket: "campusroute-ca268.appspot.com",
    messagingSenderId: "164037552565",
    appId: "1:164037552565:web:e64461bee2e260d57191fc",
    measurementId: "G-7GN7W7HW1C",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export function SignIn() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const usersCollection = firestore.collection("users");

    const addUser = (e) => {
        usersCollection
            .add({
                userNAME: auth.currentUser.displayName,
                userID: auth.currentUser.uid,
                authorPFP: auth.currentUser.photoURL,
                userCREATED: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
                console.log("User account created & signed in!");
            });
    };

    const signInWithGoogle = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then((res) => {
            addUser();
        });
    };
    const signInWithMicrosoft = () => {
        let provider = new firebase.auth.OAuthProvider("microsoft.com");
        auth.signInWithPopup(provider).then((res) => {
            addUser();
        });
    };

    if (!user) {
        return (
            <div className="body">
                <div className="container">
                    {/*
                    <h1>Sign In</h1>
                    <button onClick={signInWithGoogle} id="googleButton">
                        Sign In with Google
                    </button>
                    <button onClick={signInWithMicrosoft} id="msButton">
                        Sign In with Microsoft
                    </button>
                    */}
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdmODRlQMFb5LLmdDLjVsjtpj3DJwHSXZz1zKifzQGYHdS5oQ/viewform?embedded=true">
                        Loading???
                    </iframe>
                </div>
            </div>
        );
    } else {
        return navigate("/app");
    }
}
