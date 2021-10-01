import { useCallback } from 'react' // DOC: https://reactjs.org/docs/hooks-reference.html#usecallback
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { Button, Form } from 'semantic-ui-react'

export const SignUp = (props) => {

  const handleSubmit = useCallback(async e => {
    e.preventDefault()

    const db = getFirestore()

    // takes 3 elements passed into handleSubmit
    const { email, display, password, password2 } = e.target.elements
    const auth = getAuth() // DOC: https://firebase.google.com/docs/reference/unity/class/firebase/auth/firebase-auth

    // if passwords are equal, attempt to create new user on db
    if (password.value === password2.value)
      try {
        const newUser = await createUserWithEmailAndPassword(auth, email.value, password.value) // Attempt to create new user
        console.log('New user created')
        onAuthStateChanged(auth, (async (user) => {
          if (user) {
            await updateProfile(user, {displayName: display.value})
            console.log('Profile updated with new displayname')
          }
        }))
        await setDoc(doc(db, "users", newUser.user.uid), {
          points: 0,
        })
        props.history.push('/')
      } catch (e) {
        console.log(e)
      }
    // if passwords are not equal, prompt error.
    else
      alert("Passwords do not match");
  }, [props.history])

  return (
    <>
      <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Email Address</label>
            <input
              name="email"
              placeholder="Email"
              type="email"
            />
          </Form.Field>
          <Form.Field>
            <label>Display Name</label>
            <input
              name="display"
              placeholder="Display Name"
              type="text"
            />
          </Form.Field>
          <Form.Field>
            <label >Password</label>
            <input 
              type='password' 
              placeholder='Password'
              name="password"
            />
          </Form.Field>
          <Form.Field>
            <label >Confirm Password</label>
            <input 
              type='password' 
              placeholder='Confirm Password'
              name="password2"
            />
          </Form.Field>
          <Button type='submit'>
              Register
          </Button>
      </Form>
    </>
  )
}

