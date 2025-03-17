import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">About Page</h1>
      <p className="mb-4">This is the about page of our application.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  )
}

export default About