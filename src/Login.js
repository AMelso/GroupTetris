import { useCallback } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Button, Form } from 'semantic-ui-react'

export const Login = () => {
  const handleSubmit = useCallback(async e => {
    e.preventDefault()

    const { email, password } = e.target.elements
    const auth = getAuth()
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value)
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
