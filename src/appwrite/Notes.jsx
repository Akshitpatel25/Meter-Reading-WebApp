import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "../appwrite/config";
import { ID, Query } from "appwrite";

export const IDEAS_DATABASE_ID = import.meta.env.VITE_DATABASES_ID 
export const IDEAS_COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID 

const IdeasContext = createContext();

export function useIdeas() {
  return useContext(IdeasContext);
}

export function IdeaProvider(props) {
  const [ideas, setIdeas] = useState([]);

  async function add(idea) {
    const response = await databases.createDocument(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      ID.unique(),
      idea
    );
    setIdeas((ideas) => [response, ...ideas].slice(0, 10));
  }

  async function remove(id) {
    await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
    setIdeas((ideas) => ideas.filter((idea) => idea.$id !== id));
    await init(); // Refetch ideas to ensure we have 10 items
  }

  async function update(id, updatedIdea) {
    const response = await databases.updateDocument(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      id,
      updatedIdea
    );
    setIdeas((ideas) =>
      ideas.map((idea) => (idea.$id === id ? response : idea))
    );
  }

  async function init() {
    const response = await databases.listDocuments(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );
    setIdeas(response.documents);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <IdeasContext.Provider value={{ current: ideas, add, remove, update }}>
      {props.children}
    </IdeasContext.Provider>
  );
}
