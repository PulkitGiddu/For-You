
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm1Iir2WIOPvDp5kv8_E7HkoqZ6FGaN2U",
  authDomain: "veat-149a3.firebaseapp.com",
  databaseURL: "https://veat-149a3-default-rtdb.firebaseio.com",
  projectId: "veat-149a3",
  storageBucket: "veat-149a3.appspot.com",
  messagingSenderId: "1040685689580",
  appId: "1:1040685689580:web:d6b7347edfd535e19f93c9",
  measurementId: "G-9XZYSFS8LH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
