import DatabaseService from "../database/database.service.ts";
import {LocalStorage} from "../../enums/localStorage.ts";

export default class AuthService {
    public async login(email: string, password: string) {
        try {
            const database = DatabaseService.getInstance().getDatabase();

            const {data, error} = await database.auth.signInWithPassword({
                email: email,
                password: password
            })

            localStorage.setItem(LocalStorage.userData, JSON.stringify(data))

            if (error) {
                return {
                    status: false,
                    message: error.toString(),
                }
            } else {
                return {
                    status: true,
                    data: data
                }
            }
        } catch (e: any) {
            return {
                status: false,
                message: e.toString(),
            }
        }
    }
}