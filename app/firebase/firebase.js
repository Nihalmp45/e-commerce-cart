import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC2yp_3Z65RJ227ZxDSsI68zaONNLJTrDo",
  authDomain: "e-commerce-cart-38b09.firebaseapp.com",
  projectId: "e-commerce-cart-38b09",
  storageBucket: "e-commerce-cart-38b09.appspot.com",
  messagingSenderId: "251812552168",
  appId: "1:251812552168:web:388df635211b26595c585d",
  measurementId: "G-ZYH15YQPQ7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
