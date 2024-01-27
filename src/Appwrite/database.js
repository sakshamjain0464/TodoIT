import { ID, Query } from 'appwrite';
import { databases, storage } from './config'
import { account } from './config';

// For accessing databases and storage

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const todoCollection = import.meta.env.VITE_APPWRITE_TODO_COLLECTION_ID
const photoBucket = import.meta.env.VITE_APPWRITE_PHOTOS_BUCKET_ID

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

    async addProfilePhotoToStorage(user, photo) {
        try {
            const photoData = await storage.createFile(photoBucket, ID.unique(), photo);
            const photoURL = await storage.getFileView(photoBucket, photoData.$id);
            await account.updatePrefs({ ...user.preferences, profile: photoURL.href })
            return true;
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async addProfileBannerToStorage(user, photo) {
        try {
            const photoData = await storage.createFile(photoBucket, ID.unique(), photo);
            const photoURL = await storage.getFileView(photoBucket, photoData.$id);
            await account.updatePrefs({ ...user.preferences, banner: photoURL.href })
            return true;
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async addProfileBannerFromUnsplash(user, url) {
        try {
            await account.updatePrefs({ ...user.preferences, banner: url })
            return true;
        } catch (error) {
            console.error(error)
            return false
        }
    }
}

const database = new Database;

// The object is exported, directly use this object to interact with database and storage
export default database;