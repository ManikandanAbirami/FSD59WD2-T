import React from 'react'
import Sub from './Sub';

function Home() {
    const color = "red";
    const speed = "fast";
    return ( // JSX = HTML + JS
        <div>
            <Sub color={color} speed={speed}></Sub>
        </div>
    )
}

export default Home