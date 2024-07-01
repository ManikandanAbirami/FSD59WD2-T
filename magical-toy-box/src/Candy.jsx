import React, { useState } from 'react'

function Candy() {
    const [parotta, setParotta] = useState(0);
    const sooriEatsParotta = () => {
        setParotta(parotta + 5);
    }
    return (
        <div>
            <p>Soori ate {parotta} parottas.</p>
            <button onClick={sooriEatsParotta}>Soori Ate</button>
        </div>
    )
}

export default Candy