import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbcuvZZUQeRhoYgt1XZDzYuo8pwTCbiiE",
  authDomain: "melodia-music-app.firebaseapp.com",
  projectId: "melodia-music-app",
  storageBucket: "melodia-music-app.appspot.com",
  messagingSenderId: "691994025219",
  appId: "1:691994025219:web:a6aa554d2e943dbc759d36",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
