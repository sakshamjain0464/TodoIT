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
            console.log(error)
            return null
        }
    }

    async loginViaGoogle() {
        try {
            await account.createOAuth2Session('google', 'http://localhost:5173/', 'http://localhost:5173/login');
            const userData = await account.get()
            const user = { id: userData.$id, name: userData.name, email: userData.email, phone: userData.phone, emailVerification: userData.emailVerification, phoneVerification: userData.phoneVerification, preferences: userData.prefs }
            return user
        } catch (error) {
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

    async addPhoneNumberToAccount(phone, password) {
        try {
            const data = await account.updatePhone(phone, password);
            console.log(data)
            return true
        } catch (error) {
            return false
        }
    }

    async updateEmailToAccount(email, password) {
        try {
            const data = await account.updateEmail(email, password);
            console.log(data)
            return true
        } catch (error) {
            return false
        }
    }

    async createEmailVerificationLink() {
        try {
            const data = await account.createVerification('http://localhost:5173/profile/verifyEmail');
            console.log(data)
            return true
        } catch (error) {
            return false
        }
    }

    async completeEmailVerification(userId, secret) {
        try {
            const data = await account.updateVerification(userId, secret);
            console.log(data)
            return true
        } catch (error) {
            return false
        }
    }

    async createPhoneVerificationCode() {
        try {
            const data = await account.createPhoneVerification();
            console.log(data)
            return true
        } catch (error) {
            return false
        }
    }

    async completePhoneVerification(userId, secret) {
        try {
            const data = await account.updatePhoneVerification(userId, secret);
            console.log(data)
            return true
        } catch (error) {
            return false
        }
    }

    async createForgotPassword(email) {
        try {
            const data = await account.createRecovery(email, 'http://localhost:5173/profile/confirmForgotPassword');
            console.log(data)
            return true
        } catch (error) {
            return false
        }
    }

    async confirmForgotPassword(userId, secret, password, confirmPassword) {
        try {
            const data = await account.updateRecovery(userId, secret, password, confirmPassword);
            console.log(data)
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

    async autoLogin() {
        try {
            const userData = await account.get('current')
            const user = { id: userData.$id, name: userData.name, email: userData.email, phone: userData.phone, emailVerification: userData.emailVerification, phoneVerification: userData.phoneVerification, preferences: userData.prefs }
            return user
        } catch (error) {
            return null
        }
    }
}

const authenticator = new Authenticator();
export default authenticator;