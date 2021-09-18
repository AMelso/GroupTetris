import { useCallback } from 'react' // DOC: https://reactjs.org/docs/hooks-reference.html#usecallback
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Button, Form } from 'semantic-ui-react'

export const Login = () => {
  const handleSubmit = useCallback(async e => {
    e.preventDefault()

    const { email, password } = e.target.elements // Get email and password objects from form
    const auth = getAuth() // DOC: https://firebase.google.com/docs/reference/unity/class/firebase/auth/firebase-auth
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value) // Attempt to log in
    } catch (e) {
      alert(e.message)
    }
  }, [])

  return (
    <>
      <h1>Login</h1>
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
        <Button 
          type='submit'
          onClick >
            Log In
        </Button>
      </Form>
    </>
  )
}
