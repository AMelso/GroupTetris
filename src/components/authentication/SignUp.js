import { useCallback } from 'react' // DOC: https://reactjs.org/docs/hooks-reference.html#usecallback
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { Button, Form } from 'semantic-ui-react'

export const SignUp = (props) => {

  const handleSubmit = useCallback(async e => {
    e.preventDefault()

    const db = getFirestore()

    const { email, password } = e.target.elements
    const auth = getAuth() // DOC: https://firebase.google.com/docs/reference/unity/class/firebase/auth/firebase-auth
    try {
      const newUser = await createUserWithEmailAndPassword(auth, email.value, password.value) // Attempt to create new user
      console.log('USER: ', newUser.user.uid)
      await setDoc(doc(db, "users", newUser.user.uid), {
        points: 0,
      })
      props.history.push('/')
    } catch (e) {
      console.log(e)
    }
  }, [props.history])

  return (
    <>
      <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Email</label>
            <input
              name="email"
              placeholder="email"
              type="email"
            />
          </Form.Field>
          <Form.Field>
            <label >Password</label>
            <input 
              type='password' 
              placeholder='password'
              name="password"
            />
          </Form.Field>
          <Button type='submit'>
              Sign Up
          </Button>
      </Form>
    </>
  )
}

