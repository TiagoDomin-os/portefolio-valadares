//import * as firebase from 'firebase/app';
//import 'firebase/storage';
//import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


//Tiago knguro
const firebaseConfig = {
    apiKey: "AIzaSyAE0qsk7ox3PcI0pumZVhV5f5QOirecoh4",
    authDomain: "portefolio-valadares.firebaseapp.com",
    projectId: "portefolio-valadares",
    storageBucket: "portefolio-valadares.appspot.com",
    messagingSenderId: "902190186784",
    appId: "1:902190186784:web:40bb4a5bc8d84aab369745"
  };




//Coding Pionners

// const firebaseConfig = {
//   apiKey: "AIzaSyB7SiPCr0YwamEgbS8lSc6hVCvKIyyXICY",
//   authDomain: "unique-vision-studios.firebaseapp.com",
//   projectId: "unique-vision-studios",
//   storageBucket: "unique-vision-studios.appspot.com",
//   messagingSenderId: "461781226655",
//   appId: "1:461781226655:web:7d9d5de5966b29f23dfeaa"
// };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectStorage = getStorage();
const projectFirestore = getFirestore();

export { projectStorage, projectFirestore};