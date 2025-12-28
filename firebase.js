import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBonoja7M7MxUQzgEzrXfXYNnUhCyC8OWw",
  authDomain: "krim-portfolio.firebaseapp.com",
  projectId: "krim-portfolio",
  storageBucket: "krim-portfolio.firebasestorage.app",
  messagingSenderId: "295496484938",
  appId: "1:295496484938:web:0802f974874fa017a3feb3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
