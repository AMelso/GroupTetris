import { getFirestore, collection, query, orderBy, limit, getDocs } from "firebase/firestore"
// check who is logged in 
import { getAuth, onAuthStateChanged } from "firebase/auth"
// database object
const db = getFirestore()
// checks what user is logged in 
const auth = getAuth()
let userUID = ''
onAuthStateChanged(auth, (user => {
  // get userID
   userUID = user ? user.uid : '' // Get user's UID
}))

// Leaderboard Total Score
export const GetTotalScores = async () => {
  // total Ref equal object of firebase databse collection
  const totalRef =collection(db, "leaderboards/default/TotalPoints")
  // const q = get 10 records ordered by score from collection in descending order
  const q = query(totalRef, orderBy('score', 'desc'), limit(10))
  // formatting firebase document data into json format
  const querySnapshot = await getDocs(q)
  // results object and pushing querySnapshots into results so that we are able to use result in react
  let results = []
  querySnapshot.forEach((doc) => {
    results.push(doc.data())
  })
  return results
}

export const GetHighestScores = async () => {
   // total highestRef equal object of firebase databse collection
  const highestRef = collection(db, "leaderboards/default/IndividualGamePoints")
  // const q = get 10 records ordered by score from collection in descending order
  const q = query(highestRef, orderBy('score', 'desc'), limit(10))
  // formatting firebase document data into json format
  const querySnapshot = await getDocs(q)
  // results object and pushing querySnapshots into results so that we are able to use result in react
  // react array object in order to populate the result 
  let results = []
  querySnapshot.forEach((doc) => {
    results.push(doc.data())
  })
  return results
}
// function to GetMyScores  that retrieves  users by ID on the Leaderboard for "My highest games"
export const GetMyScores = async () => {
  const myScoresRef = collection(db, `users/${userUID}/personalLeaderboard`)
  // get latest 10 score list in desc order
  const q = query(myScoresRef, orderBy('score', 'desc'), limit(10))
  // getting value in firebase document format so it's converting in Json object or React array format
  const querySnapshot = await getDocs(q)
  // results object and pushing querySnapshots into results so that we are able to use result in react
  // react array object in order to populate the result 
  let results = []
  // pushing querySnapshot in results
  querySnapshot.forEach((doc) => {
    results.push(doc.data())
  })
  return results
}