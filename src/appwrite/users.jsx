import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "./config";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const loggedIn = await account.createEmailPasswordSession(email, password);
    setUser(loggedIn);
    window.location.replace("/home"); // you can use different redirect method for your application
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  async function register(email, password, name) {
    await account.create(ID.unique(), email, password, name);
    await login(email, password);
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
}
