import { Client, Databases, Account} from "appwrite";

const client = new Client();
client
    .setEndpoint(import.meta.env.VITE_APPWRITE_PROJECT_URL)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

export const account = new Account(client);
export const databases = new Databases(client);

