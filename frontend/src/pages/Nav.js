import React from 'react'
import { Navbar } from 'react-bootstrap'

const Nav = () => {
  return (
    <div>
      <Navbar bg='primary' variant='dark' className='justify-content-center'>
        <Navbar.Brand>
          Python Flask MongoDB Redux User Management Application
        </Navbar.Brand>
      </Navbar>
    </div>
  )
}

export default Nav
