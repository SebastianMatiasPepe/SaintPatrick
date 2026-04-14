import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  )
}

export default NotFound