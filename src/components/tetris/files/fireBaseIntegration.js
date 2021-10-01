import { getFirestore, doc, updateDoc, getDoc, setDoc, addDoc, serverTimestamp, collection } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
const db = getFirestore()

const auth = getAuth()
let userUID = ''
let userName = ''
onAuthStateChanged(auth, (user => {
  userUID = user ? user.uid : '' // Get user's UID
  userName = user ? user.displayName : ''// Get user's display name
}))

// Update the total points in the userUID document in the users collection for specific users who is
//logged in 
export const UpdatePoints = async (score) => {
  // gets users by ID and then update records in firebase colleciton 
  const updateRef = doc(db, "users", userUID)
  // await can be put in front of any asynchrouous function to push your code on that line until the 
  //promises fullfulls then returns the result value
  //await will hold the execution till we never get response or result
  await updateDoc(updateRef, {
    points: score
  })
}

// Get the total points in the userUID document in the users collection
export const GetPoints = async () => {
    // we are getting all files for a specific user from the firebase collection
  const docRef = doc(db, "users", userUID)
  //got all document references from firebase by userID and repoplulating using getDoc method
  const docSnap = await getDoc(docRef) // Get the information out of the userUID document
  let points = 0;
  //console.log(docSnap.data());
  //We are checking the docSnap is getting earlier records from firebase or not
  //If user will paly the first time this games then we will get undefined or null value from firebase so 
  //We have checked he condtion  and handle error here.
  if(docSnap.data()){
    points = parseInt(docSnap.data().points) // Specifically get the points value
  }
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