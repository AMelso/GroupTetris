import { useCallback } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { Button, Form } from 'semantic-ui-react'

export const SignUp = () => {
  const handleSubmit = useCallback(async e => {
    e.preventDefault()

    const { email, password } = e.target.elements
    const auth = getAuth()
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value)
    } catch (e) {
      alert(e.message)
    }
  }, [])

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
          <Button 
            type='submit'
            onClick >
              Sign Up
          </Button>
      </Form>
    </>
  )
}

