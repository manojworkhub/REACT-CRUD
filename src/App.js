// import logo from './logo.svg';
import "./App.css";
import { useEffect, useState } from "react";
import { Button, EditableText, InputGroup, Toaster } from "@blueprintjs/core";
const AppToater = Toaster.create({
  position: "top",
});
function App() {
  const [users, setUser] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
// this useEffect is useto connect the json data from the link 
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        setUser(json);
      });
  }, []);

  let rowspanNUM = 2;


  // this one is use to add new user data to frontend
  function adduser() {
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();
    if (name && email && website) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({ name, email, website }),
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setUser([...users, data]);
          AppToater.show({
            message: "User added successfuly",
            intent: "success",
            timeout: 3000,
          });
        });
      setNewName("");
      setNewEmail("");
      setNewWebsite("");
    }
  }


  // this one is use to take the selected data from the json data ******
  function onchageHandler(id,key,value){
    setUser((users) => {
      return users.map((user) => {
        return user.id === id?{...user,[key]:value}:user;
      });
    });
  }


  // this one is use to  edit the previous data in the json 
  function updateuser(id) {
    const user = users.find((user) => user.id === id);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((data) => {
        AppToater.show({
          message: "User updated successfuly",
          intent: "success",
          timeout: 3000,
        });
      });
  }
  // this one is use to delete the data in json 
  function deleteuser(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setUser((users) => {
          return users.filter((user) => user.id !== id);
        });

        AppToater.show({
          message: "User deleted successfuly",
          intent: "success",
          timeout: 3000,
        });
      });
  }

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <table className="bp4-html-table modifier">
        <thead>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>WEBSITE</th>
          <th colSpanSpan={rowspanNUM}>ACTION</th>
        </thead>

        <tbody>
          {users.map((user) => [
            <tr key={user.id}>
              <td>{user.id}</td>
              <td> {user.name} </td>
              <td>
                <EditableText
                  onChange={(value) =>
                    onchageHandler(user.id, "email", value)
                  }
                  value={user.email}
                />
              </td>
              <td>
                <EditableText
                  onChange={(value) =>
                    onchageHandler(user.id, "website", value)
                  }
                  value={user.website}
                />
              </td>
              <td>
                <Button onClick={() => updateuser(user.id)} intent="primary">
                  update
                </Button>
              </td>
              <td>
                <Button onClick={() => deleteuser(user.id)} intent="danger">
                  delete
                </Button>
              </td>
            </tr>,
          ])}
        </tbody>
        <tfoot>
          <td></td>
          <td>
            <InputGroup
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="name"
            />
          </td>
          <td>
            <InputGroup
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="email"
            />
          </td>
          <td>
            <InputGroup
              value={newWebsite}
              onChange={(e) => setNewWebsite(e.target.value)}
              placeholder="website"
            />
          </td>
          <td colSpan={rowspanNUM}>
            <Button intent="success" onClick={adduser}>
              ADD USER
            </Button>
          </td>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
