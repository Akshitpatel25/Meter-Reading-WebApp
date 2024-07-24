import { Account, Client, Databases } from "appwrite";

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_ENDPOINT)
    .setProject(import.meta.env.VITE_PROJECT_ID)

const account = new Account(client)
const databases = new Databases(client)

export {account, databases}