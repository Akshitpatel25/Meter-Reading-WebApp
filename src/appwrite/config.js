import { Account, Client, Databases } from "appwrite";

const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6698c096001e55d8abb7")

const account = new Account(client)
const databases = new Databases(client)

export {account, databases}