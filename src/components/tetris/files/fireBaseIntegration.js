import { getFirestore, doc, updateDoc, getDoc, setDoc, addDoc, serverTimestamp, collection } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
const db = getFirestore()

const auth = getAuth()
let userUID = ''
let userName = ''
onAuthStateChanged(auth, (user => {
  userUID = user.uid
  userName = user.displayName
}))


export const UpdatePoints = async (score) => {
  const updateRef = doc(db, "users", userUID)
  await updateDoc(updateRef, {
    points: score
  })
}

export const GetPoints = async () => {
  const docRef = doc(db, "users", userUID)
  const docSnap = await getDoc(docRef)
  const points = parseInt(docSnap.data().points)
  // console.log('RETRIEVED POINTS: ', points)
  return points
}

export const UpdateLeaderBoards = async (total, score) => {

  let displayName = userName
  if (userName === null) {
    displayName = 'Anonymous'
  }

  // Set the total points leaderboard entry
  await setDoc(doc(db, 'leaderboards/default/TotalPoints', userUID), {
    name: displayName,
    score: total,
    timestamp: serverTimestamp()
  })

  // Set the Individual Game points leaderboard entry IF it is >= current highscore
  const docRef = doc(db, "leaderboards/default/IndividualGamePoints", userUID)
  const docSnap = await getDoc(docRef)
  const highscore = parseInt(docSnap.data().score)
  if (score >= highscore) {
    await setDoc(doc(db, 'leaderboards/default/IndividualGamePoints', userUID), {
      name: displayName,
      score: score,
      timestamp: serverTimestamp()
    })
  }

  // Set personal Individual Game leaderboard
  await addDoc(collection(db, `users/${userUID}/personalLeaderboard`), {
    score: score,
    timestamp: serverTimestamp()
  })
}