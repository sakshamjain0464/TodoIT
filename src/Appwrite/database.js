import { ID, Query } from 'appwrite';
import { databases } from './config'

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const todoCollection = import.meta.env.VITE_APPWRITE_TODO_COLLECTION_ID
const tagsCollection = import.meta.env.VITE_APPWRITE_TAGS_COLLECTION_ID

class Database {
    async fetchTodos(userID) {
        try {
            const todosData = await databases.listDocuments(databaseId, todoCollection, [Query.equal('user', userID)])
            return todosData.documents;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async addTodoToDataBase(todo){
        try {
            const todoData = await databases.createDocument(databaseId,todoCollection, ID.unique(), todo)
            return todoData;
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async fetchTags(userID) {
        try {
            const tagsData = await databases.listDocuments(databaseId, tagsCollection, [Query.equal('user', userID)])
            const tags = tagsData.documents.map((tag) => tag.tagName)
            return tags
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

const database = new Database;
export default database;