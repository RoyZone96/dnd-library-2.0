import {useState, useEffect, React} from 'react'
import axios from 'axios'


export default function UserList() {
    
    const [users, setUsers] = useState ([])

    useEffect(() => {
       loadUsers();
    }, [])

    const loadUsers = async () => {
        const response = await axios.get('http://localhost:8080/users')
        console.log(response.data)
        setUsers(response.data)
    }

  
    return (
    <div className='scroll-container'>
        <h1>Users</h1>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

    </div>
  )
}
