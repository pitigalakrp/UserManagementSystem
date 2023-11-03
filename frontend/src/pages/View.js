import React, { useEffect } from 'react'
import { Table, Button, ButtonGroup } from 'react-bootstrap'
import { deleteUser } from '../Redux/Slices/deleteSlice'
import { useDispatch } from 'react-redux'
import { getUsers } from '../Redux/Slices/userSlice'
import { updateUser } from '../Redux/Slices/updateUserSlice'

const View = ({ users }) => {
  const dispatch = useDispatch()

  const handleDelete = id => {
    dispatch(deleteUser(id))
  }

  const handleUpdate = id => [dispatch(updateUser(id))]

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div>
      <Table bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        {users &&
          users.map((user, index) => (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{user.address}</td>
                <td>
                  <ButtonGroup>
                    <Button
                      style={{ marginRight: '5px' }}
                      variant='danger'
                      onClick={() => {
                        handleDelete(user._id)
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      style={{ marginRight: '5px' }}
                      variant='secondary'
                      onClick={() => {
                        handleUpdate(user._id)
                      }}
                    >
                      Update
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            </tbody>
          ))}
      </Table>
    </div>
  )
}

export default View
