import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newUser = [...users, data];
        console.log(newUser)
        setUsers(newUser);
        form.reset();
      });
  };

  return (
    <>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" placeholder="Name" />
        <br />
        <input type="email" name="email" id="" placeholder="Email" />
        <br />
        <input type="submit" value="Add User" />
      </form>

      <h1>Users management system:{users.length}</h1>
      <div>
        {
          users.map(user => <p key={user.id}>{user.id} : {user.name} : {user.email}</p> )
        }
      </div>
    </>
  );
}

export default App;
