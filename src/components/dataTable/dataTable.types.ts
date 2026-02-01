import type {Categories} from "../../models/categories.ts";
import type {Inventories} from "../../models/inventories.ts";
import type {InventoryTicket} from "../../models/inventory_ticket.ts";
import type {Items} from "../../models/items.ts";
import type {Requests} from "../../models/requests.ts";

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "14.1"
    }
    public: {
        Tables: {
            categories: {
                Row: Categories
                Insert: {
                    created_at?: string
                    id?: number
                    name?: string | null
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string
                    id?: number
                    name?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            inventories: {
                Row: Inventories
                Insert: {
                    created_at?: string
                    date?: string | null
                    id?: number
                    updated_at?: string | null
                    warehouse_id?: number | null
                }
                Update: {
                    created_at?: string
                    date?: string | null
                    id?: number
                    updated_at?: string | null
                    warehouse_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: "inventories_warehouse_id_fkey"
                        columns: ["warehouse_id"]
                        isOneToOne: false
                        referencedRelation: "warehouses"
                        referencedColumns: ["id"]
                    },
                ]
            }
            inventory_ticket: {
                Row: InventoryTicket
                Insert: {
                    created_at?: string
                    expired_at?: string | null
                    id?: number
                    inventory_id?: number | null
                    item_id?: number | null
                    quantity?: number | null
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string
                    expired_at?: string | null
                    id?: number
                    inventory_id?: number | null
                    item_id?: number | null
                    quantity?: number | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "inventory_ticket_inventory_id_fkey"
                        columns: ["inventory_id"]
                        isOneToOne: false
                        referencedRelation: "inventories"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "inventory_ticket_item_id_fkey"
                        columns: ["item_id"]
                        isOneToOne: false
                        referencedRelation: "items"
                        referencedColumns: ["id"]
                    },
                ]
            }
            items: {
                Row: Items
                Insert: {
                    category_id?: number | null
                    created_at?: string
                    id?: number
                    name?: string | null
                    quantity_type?: string | null
                    supplier_id?: number | null
                    tags?: string[] | null
                    updated_at?: string | null
                    warning_limit?: number | null
                }
                Update: {
                    category_id?: number | null
                    created_at?: string
                    id?: number
                    name?: string | null
                    quantity_type?: string | null
                    supplier_id?: number | null
                    tags?: string[] | null
                    updated_at?: string | null
                    warning_limit?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: "items_category_id_fkey"
                        columns: ["category_id"]
                        isOneToOne: false
                        referencedRelation: "categories"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "items_supplier_id_fkey"
                        columns: ["supplier_id"]
                        isOneToOne: false
                        referencedRelation: "suppliers"
                        referencedColumns: ["id"]
                    },
                ]
            }
            requests: {
                Row: Requests
                Insert: {
                    created_at?: string
                    description?: string | null
                    id?: number
                    inventory_ticket_id?: number | null
                    name?: string | null
                    status?: number | null
                    type?: number | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string
                    description?: string | null
                    id?: number
                    inventory_ticket_id?: number | null
                    name?: string | null
                    status?: number | null
                    type?: number | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "requests_inventory_ticket_id_fkey"
                        columns: ["inventory_ticket_id"]
                        isOneToOne: false
                        referencedRelation: "inventory_ticket"
                        referencedColumns: ["id"]
                    },
                ]
            }
            suppliers: {
                Row: {
                    created_at: string
                    id: number
                    name: string | null
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string
                    id?: number
                    name?: string | null
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string
                    id?: number
                    name?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            tags: {
                Row: {
                    created_at: string
                    id: number
                    name: string | null
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string
                    id?: number
                    name?: string | null
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string
                    id?: number
                    name?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            user_details: {
                Row: {
                    address: string | null
                    avatar: string | null
                    created_at: string
                    dob: string | null
                    first_name: string | null
                    id: number
                    last_name: string | null
                    role: number | null
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    address?: string | null
                    avatar?: string | null
                    created_at?: string
                    dob?: string | null
                    first_name?: string | null
                    id?: number
                    last_name?: string | null
                    role?: number | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    address?: string | null
                    avatar?: string | null
                    created_at?: string
                    dob?: string | null
                    first_name?: string | null
                    id?: number
                    last_name?: string | null
                    role?: number | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: []
            }
            warehouses: {
                Row: {
                    address: string | null
                    created_at: string
                    id: number
                    name: string | null
                    owner_id: number | null
                    updated_at: string | null
                }
                Insert: {
                    address?: string | null
                    created_at?: string
                    id?: number
                    name?: string | null
                    owner_id?: number | null
                    updated_at?: string | null
                }
                Update: {
                    address?: string | null
                    created_at?: string
                    id?: number
                    name?: string | null
                    owner_id?: number | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "warehouses_owner_id_fkey"
                        columns: ["owner_id"]
                        isOneToOne: false
                        referencedRelation: "user_details"
                        referencedColumns: ["id"]
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
    DefaultSchemaTableNameOrOptions extends | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
            schema: keyof DatabaseWithoutInternals
        }
        ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
            DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
            DefaultSchema["Views"])
        ? (DefaultSchema["Tables"] &
            DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
                Row: infer R
            }
            ? R
            : never
        : never

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends | keyof DefaultSchema["Tables"]
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
            schema: keyof DatabaseWithoutInternals
        }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
            Insert: infer I
        }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
        ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
                Insert: infer I
            }
            ? I
            : never
        : never

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends | keyof DefaultSchema["Tables"]
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
            schema: keyof DatabaseWithoutInternals
        }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
            Update: infer U
        }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
        ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
                Update: infer U
            }
            ? U
            : never
        : never

export type Enums<
    DefaultSchemaEnumNameOrOptions extends | keyof DefaultSchema["Enums"]
        | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
            schema: keyof DatabaseWithoutInternals
        }
        ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
        ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
        : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends | keyof DefaultSchema["CompositeTypes"]
        | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
            schema: keyof DatabaseWithoutInternals
        }
        ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never,
> = PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
        ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
        : never

export const Constants = {
    public: {
        Enums: {},
    },
} as const
