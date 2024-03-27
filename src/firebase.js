import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCMT8dx-GlrQaeJUP-uxm7YHNeE0LQBkSM",
  authDomain: "cryptocurrency-price-portfolio.firebaseapp.com",
  projectId: "cryptocurrency-price-portfolio",
  storageBucket: "cryptocurrency-price-portfolio.appspot.com",
  messagingSenderId: "441691382814",
  appId: "1:441691382814:web:daced39a9c454e95253a0f",
  measurementId: "G-EJTB3XSK1V",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
