import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDGkLpR4YeZM9jZX7cTZrBGuyqeogz48W8',
  authDomain: 'movie-app-32f9d.firebaseapp.com',
  projectId: 'movie-app-32f9d',
  storageBucket: 'movie-app-32f9d.appspot.com',
  messagingSenderId: '451765249125',
  appId: '1:451765249125:web:7d96c615b318a39478928c',
  measurementId: 'G-33NLE3P6P5',
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const auth = getAuth()

export default app
export { db, auth }
