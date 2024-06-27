import React from 'react'
import { useSchool } from './SchoolContext';

function Student() {
    const schoolInfo = useSchool();
    return (
        <div>
            <p>
                Student is studying at {schoolInfo.name}
            </p>
        </div>
    )
}

export default Student