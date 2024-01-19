import { ID, Query } from 'appwrite';
import { databases } from './config'

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const todoCollection = import.meta.env.VITE_APPWRITE_TODO_COLLECTION_ID

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

    async addTodoToDataBase(todo) {
        try {
            const todoData = await databases.createDocument(databaseId, todoCollection, ID.unique(), todo)
            console.log(todoData)
            return todoData;
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async updateTodoToDatabase(todoId, updates) {
        try {
            const updateData = await databases.updateDocument(databaseId, todoCollection, todoId, updates)
            return updateData;
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async deleteTodoFromDatabase(todoId) {
        try {
            const todoData = await databases.deleteDocument(databaseId, todoCollection, todoId)
            return todoData;
        } catch (error) {
            console.error(error)
            return null
        }
    }
}

const database = new Database;
export default database;