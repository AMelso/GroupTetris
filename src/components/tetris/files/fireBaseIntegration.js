import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
const db = getFirestore()

const auth = getAuth()
let userUID = ''
onAuthStateChanged(auth, (user => {
  userUID = user.uid
}))

export const UpdatePoints = async (score) => {
  const oldScore = await GetPoints()
  const newScore = oldScore + score
  const updateRef = doc(db, "users", userUID)
  await updateDoc(updateRef, {
    points: newScore
  })
}

export const GetPoints = async () => {
  const docRef = doc(db, "users", userUID)
  const docSnap = await getDoc(docRef)
  const points = parseInt(docSnap.data().points)
  console.log('RETRIEVED POINTS: ', points)
  return points
}