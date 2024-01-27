import { ID } from "appwrite";
import { account } from "./config";

// Classs for Authentication and Usr Services, all the user methods for backend features are wrapped in this class.
class Authenticator {
    async loginViaEmail(email, password) {
        // For Email Login
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
        // For Google Login
        try {
            await account.createOAuth2Session('google', 'https://todo-it-pi.vercel.app/', 'https://todo-it-pi.vercel.app/login');
            const userData = await account.get()
            const user = { id: userData.$id, name: userData.name, email: userData.email, phone: userData.phone, emailVerification: userData.emailVerification, phoneVerification: userData.phoneVerification, preferences: userData.prefs }
            return user
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async createAccountViaEmail(email, password, name) {
        // For SignUp, Create New Account is only possible with this method
        try {
            await account.create(ID.unique(), email, password, name)
            return true
        } catch (error) {
            return false
        }
    }

    async addPhoneNumberToAccount(phone, password) {
        // Add phone number to account
        try {
            await account.updatePhone(phone, password);
            return true
        } catch (error) {
            return false
        }
    }

    async updateEmailToAccount(email, password) {
        // For Email Update
        try {
            await account.updateEmail(email, password);
            return true
        } catch (error) {
            return false
        }
    }

    async createEmailVerificationLink() {
        // For creating an Email verification link and send it to email
        try {
            await account.createVerification('https://todo-it-pi.vercel.app/profile/verifyEmail');
            return true
        } catch (error) {
            return false
        }
    }

    async completeEmailVerification(userId, secret) {
        // For Completing user Email Verification from the link
        try {
            const data = await account.updateVerification(userId, secret);
            return true
        } catch (error) {
            return false
        }
    }

    async createPhoneVerificationCode() {
        //Generating user phone verification code
        try {
            await account.createPhoneVerification();
            return true
        } catch (error) {
            return false
        }
    }

    async completePhoneVerification(userId, secret) {
        // Verify the user phone verification code
        try {
            const data = await account.updatePhoneVerification(userId, secret);
            return true
        } catch (error) {
            return false
        }
    }

    async createForgotPassword(email) {
        // Creating a password recovery
        try {
            await account.createRecovery(email, 'https://todo-it-pi.vercel.app/profile/confirmForgotPassword');
            return true
        } catch (error) {
            return false
        }
    }

    async confirmForgotPassword(userId, secret, password, confirmPassword) {
        // For Completing the forgot password
        try {
            await account.updateRecovery(userId, secret, password, confirmPassword);
            return true
        } catch (error) {
            return false
        }
    }

    async logout() {
        //For Logout
        try {
            await account.deleteSession('current');
            return true;
        }
        catch (error) {
            console.log(error)
            return false;
        }
    }

    async autoLogin() {
        // For Auto Login
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

// The object of the class is returned, directly use the authenticator method for user part in backend
export default authenticator;