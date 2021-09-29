import { getFirestore, doc, updateDoc, getDoc, setDoc, addDoc, serverTimestamp, collection } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
const db = getFirestore()


const auth = getAuth()
let userUID = ''
let userName = ''
onAuthStateChanged(auth, (user => {

  if (user) {
    userUID = user.uid // Get user's UID
    userName = user.displayName // Get user's display name
  }
}))

// Update the total points in the userUID document in the users collection
export const UpdatePoints = async (score) => {
  const updateRef = doc(db, "users", userUID)
  await updateDoc(updateRef, {
    points: score
  })
}

// Get the total points in the userUID document in the users collection
export const GetPoints = async () => {
  const docRef = doc(db, "users", userUID)
  const docSnap = await getDoc(docRef) // Get the information out of the userUID document
  const points = parseInt(docSnap.data().points) // Specifically get the points value
  // console.log('RETRIEVED POINTS: ', points)
  return points
}

export const UpdateLeaderBoards = async (total, score) => {

  // Does a username exist? 
  let displayName = userName // If so set displayName to that username
  if (userName === null) { // If not, set displayName to Anonymous
    displayName = 'Anonymous'
  }

  // Set the total points leaderboard entry
  await setDoc(doc(db, 'leaderboards/default/TotalPoints', userUID), { // Set the userUID document in the TotalPoints leaderboard to the values below
    name: displayName,
    score: total,
    timestamp: serverTimestamp()
  })

  // Set the Individual Game points leaderboard entry IF it is >= current highscore
  const docRef = doc(db, "leaderboards/default/IndividualGamePoints", userUID) // path to read
  const docSnap = await getDoc(docRef) // Get data from document userUID
  let highscore = 0
  if (docSnap.exists()) { // Does a highscore already exist in docSnap?
    highscore = parseInt(docSnap.data().score) // Set highscore to that score
  }
  if (score >= highscore) { // Is the current game's score higher than the pre-existing high score?
    await setDoc(doc(db, 'leaderboards/default/IndividualGamePoints', userUID), { // Set the userUID document in the IndividualGamePoints leaderboard to the values below
      name: displayName,
      score: score,
      timestamp: serverTimestamp()
    })
  }

  // Set personal Individual Game leaderboard
  await addDoc(collection(db, `users/${userUID}/personalLeaderboard`), { // path to write values below
    score: score,
    timestamp: serverTimestamp()
  })
}