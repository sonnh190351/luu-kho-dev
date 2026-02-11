import DatabaseService from "../database/database.service.ts";
import {DatabaseTables} from "../../enums/tables.ts";
import {NotificationsService} from "../notifications/notifications.service.ts";

export default class InventoryService {
    private static instance: InventoryService;

    private database: DatabaseService;

    private constructor() {
        this.database = DatabaseService.getInstance();
    }

    public static getInstance(): InventoryService {
        if (!InventoryService.instance) {
            InventoryService.instance = new InventoryService();
        }

        return InventoryService.instance;
    }

    public async getAllRows(table: DatabaseTables){
        const response = await this.database.getAll(table)

        if(response.error){
            NotificationsService.error("Inventory Service", `Failed to get items: ${response.error}`)
            return []
        }

        return response.data
    }

    public async getUsers(){
        return await this.database.getUsers();
    }
}