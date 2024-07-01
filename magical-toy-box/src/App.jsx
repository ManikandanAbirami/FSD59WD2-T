import React from 'react'
import SchoolProvider from './SchoolContext'
import Classroom from './Classroom'
import Home from './Home'
import Candy from './Candy'
import HigherOrderComponent from './HigherOrderComponent'
import Pizza from './Pizza'
import WithToppings from './WithToppings'

const EnhancedPizza = WithToppings(Pizza);

function App() {

  return (
    // <SchoolProvider>
    //   <Classroom />
    // </SchoolProvider>
    // <Home />
    // <Candy />
    // <HigherOrderComponent />
    <div>
      <Pizza toppings="No toppings"></Pizza>
      <EnhancedPizza></EnhancedPizza>
    </div>
  )
}

export default App
