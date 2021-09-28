import { getFirestore, collection, query, orderBy, limit, getDocs } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
const db = getFirestore()

const auth = getAuth()
let userUID = ''
onAuthStateChanged(auth, (user => {
  userUID = user.uid // Get user's UID
}))

export const GetTotalScores = async () => {
  const totalRef = collection(db, "leaderboards/default/TotalPoints")
  const q = query(totalRef, orderBy('score', 'desc'), limit(10))
  const querySnapshot = await getDocs(q)
  let results = []
  querySnapshot.forEach((doc) => {
    results.push(doc.data())
  })
  return results
}

export const GetHighestScores = async () => {
  const highestRef = collection(db, "leaderboards/default/IndividualGamePoints")
  const q = query(highestRef, orderBy('score', 'desc'), limit(10))
  const querySnapshot = await getDocs(q)
  let results = []
  querySnapshot.forEach((doc) => {
    results.push(doc.data())
  })
  return results
}

export const GetMyScores = async () => {
  const myScoresRef = collection(db, `users/${userUID}/personalLeaderboard`)
  const q = query(myScoresRef, orderBy('score', 'desc'), limit(10))
  const querySnapshot = await getDocs(q)
  let results = []
  querySnapshot.forEach((doc) => {
    results.push(doc.data())
  })
  return results
}