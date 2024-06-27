import React, { createContext, useContext } from 'react';

// Creating the context
const SchoolContext = createContext();

const SchoolProvider = ({ children }) => {
    const schoolInfo = {
        name: "Happy Kids School",
        address: "123 Main St, Anytown USA"
    }

    return (
        <SchoolContext.Provider value={schoolInfo}>
            {children}
        </SchoolContext.Provider>
    )
}

// Custome hook to use school context
export const useSchool = () => {
    return useContext(SchoolContext);
}

export default SchoolProvider;