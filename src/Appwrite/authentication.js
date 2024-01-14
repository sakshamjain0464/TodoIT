import { ID} from "appwrite";
import { account } from "./config";

class Authentication{
    async loginViaEmail(email, password){
        try {
            const userData = await account.createEmailSession(email, password)
            console.log(userData)
        } catch (error) {
            alert("Failed")
            console.log(error)
        }
    }

    async createAccountViaEmail(email, password, name){
        try {
            const userData = await account.create(ID.unique(), email, password, name)
            console.log(userData)
        } catch (error) {
            alert("Failed")
            console.log(error)
        }
    }
}

const authentication = new Authentication();
export default authentication;