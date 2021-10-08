import { getFirestore, collection, query, getDocs, setDoc, doc, updateDoc, increment, getDoc } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { Upgrade } from '../Upgrade'



import {useState, useEffect} from "react"


const db = getFirestore()

const auth = getAuth()
let userUID = ''


onAuthStateChanged(auth, (user => {
  
  if (user) {
    userUID = user.uid // Get user's UID
  }
}))

// Get the total points in the userUID document in the users collection
export const GetPoints = async () => {
  const docRef = doc(db, "users", userUID)
  const docSnap = await getDoc(docRef) // Get the information out of the userUID document
  const points = parseInt(docSnap.data().points) // Specifically get the points value
  // console.log('RETRIEVED POINTS: ', points)
  return points
}

export const GetUpgrades = async () => {
  const upgradesRef = collection(db, `users/${userUID}/upgrades`) // Where all the upgrades are saved
  const q = query(upgradesRef) // Query all documents at upgradesRef
  const querySnapshot = await getDocs(q) // Get those documents
  let upgrades = {}
  querySnapshot.forEach((doc) => {
    const upgradeName = doc.id // Get upgradeName from ID
    const levelObj = doc.data() // Retrieve object with document data
    const level = levelObj.level // Get the level of the upgrade from levelObj
    upgrades[upgradeName] = level // Assign upgrade name and level to key/value pair in upgrades object
  })
  return upgrades
}

export const SaveUpgrade = async (upgradeName, level, cost) => {
  
  await setDoc(doc(db, `users/${userUID}/upgrades`, upgradeName), { // Set document path ending in ID of upgradeName
    level: level, // Save the upgrade level in above document
  })
  SpendPoints(cost)

}

export const SpendPoints = async (cost) => { // cost needs to be a positive integer
  
  
  const pointsRef = doc(db, `users`, userUID) // Document path
  await updateDoc(pointsRef, {
    points: increment(-cost) // remove cost value from points
  })
  

}

