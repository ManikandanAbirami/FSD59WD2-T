import React from 'react'
import { useSchool } from './SchoolContext';
import Student from './Student';

function Classroom() {
    console.log("Context API:", useSchool());
    const schoolInfo = useSchool();
    return (
        <div>
            <h1>Welcome to {schoolInfo.name}</h1>
            <Student />
        </div>
    )
}

export default Classroom