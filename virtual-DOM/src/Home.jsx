import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch('https://jsonplaceholder.typicode.com/users');
                // const data = await response.json();
                const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
                setData(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [count]);

    // Mounting - 1st time rendering component [] useEffect
    // Update - 2nd time rendering component [count] useEffect
    // Unmounting - component is removed from the DOM []

    // useEffect(() => {
    //     document.title = `You clicked ${count} times`;
    // }, [count]);

    return (
        <div>
            <div>
                <h1>User Data</h1>
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    )
}

export default Home