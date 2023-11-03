import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addUser } from '../Redux/Slices/addUserSlice'
import { addUpdatedUser } from '../Redux/Slices/updateUserSlice'
import { toast } from 'react-toastify'

const FormFill = ({ user }) => {
  const dispatch = useDispatch()
  const initialState = {
    name: '',
    email: '',
    contact: '',
    address: ''
  }

  const [state, setState] = useState(initialState)
  const { name, email, contact, address } = state

  const handleChange = e => {
    let { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(addUser(state))
  }
  const handleUpdate = (e, id) => {
    e.preventDefault()
    dispatch(addUpdatedUser({ state, id: id }))
  }

  useEffect(() => {
    if (user) {
      setState({
        name: user.name || '',
        email: user.email || '',
        contact: user.contact || '',
        address: user.address || ''
      })
    }
  }, [user])

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            defaultValue={name}
            name='name'
            placeholder='Name'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Email'
            name='email'
            defaultValue={email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type='text'
            placeholder='Contact'
            name='contact'
            defaultValue={contact}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Address'
            name='address'
            defaultValue={address}
            onChange={handleChange}
          />
        </Form.Group>
        <div className='d-grid gap-2 mt-2'>
          <Button
            type='submit'
            variant='primary'
            size='md'
            onClick={e => {
              handleSubmit(e)
            }}
          >
            Submit
          </Button>
          <Button
            type='button'
            variant='warning'
            size='md'
            onClick={e => {
              try {
                handleUpdate(e, user.id)
              } catch (error) {
                toast.error(error)
              }
            }}
          >
            update
          </Button>
        </div>
      </Form>
    </>
  )
}

export default FormFill
