import { ID } from "appwrite";
import { account } from "./config";

class Authenticator {
    async loginViaEmail(email, password) {
        try {
            await account.createEmailSession(email, password)
            const userData = await account.get()
            const user = { id: userData.$id, name: userData.name, email: userData.email, phone: userData.phone, emailVerification: userData.emailVerification, phoneVerification: userData.phoneVerification, preferences: userData.prefs }
            return user
        } catch (error) {
            alert("Failed")
            console.log(error)
            return null
        }
    }

    async createAccountViaEmail(email, password, name) {
        try {
            await account.create(ID.unique(), email, password, name)
            return true
        } catch (error) {
            return false
        }
    }

    async logout() {
        try {
            const data = await account.deleteSession('current');
            console.log(data)
            return true;
        }
        catch (error) {
            console.log(error)
            return false;
        }
    }
}

const authenticator = new Authenticator();
export default authenticator;