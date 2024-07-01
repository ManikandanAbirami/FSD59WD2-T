import React from 'react'

function WithToppings(Component) {
    return () => {
        const toppings = ['jalepeno', 'queso', 'champiñones'];
        return <Component toppings={toppings} />
    }
}

export default WithToppings