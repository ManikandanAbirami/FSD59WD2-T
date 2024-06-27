import React from 'react'
import SchoolProvider from './SchoolContext'
import Classroom from './Classroom'

function App() {

  return (
    <SchoolProvider>
      <Classroom />
    </SchoolProvider>
  )
}

export default App
