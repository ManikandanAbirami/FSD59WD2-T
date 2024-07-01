import React from 'react'

// Higher-Order Component(HOC) - It takes a component and 
// returns a new component that has some additional characteristics
const withToppings = (Component) => {
    return (props) => {
        const toppings = ['chicken', 'jalepenos', 'cheese', 'ham', 'pineapple'];
        return <Component {...props} toppings={toppings} />
    }
}

// Plain Pizza
const Pizza = (props) => {
    return (
        <div>
            <h1>Pizza</h1>
            <p>Toppings: {props.toppings.join(', ')}</p>
        </div>
    )
}

//Enhanced component
const HigherOrderComponent = withToppings(Pizza);

export default HigherOrderComponent