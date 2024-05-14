export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            dj: {
                Row: {
                    created_at: string
                    dj_id: string
                    id: number
                    username: string
                }
                Insert: {
                    created_at?: string
                    dj_id: string
                    id?: number
                    username: string
                }
                Update: {
                    created_at?: string
                    dj_id?: string
                    id?: number
                    username?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "dj_dj_id_fkey"
                        columns: ["dj_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            listeners: {
                Row: {
                    created_at: string
                    id: number
                    room_id: number | null
                    user_id: string
                    username: string
                }
                Insert: {
                    created_at?: string
                    id?: number
                    room_id?: number | null
                    user_id: string
                    username: string
                }
                Update: {
                    created_at?: string
                    id?: number
                    room_id?: number | null
                    user_id?: string
                    username?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "listeners_room_id_fkey"
                        columns: ["room_id"]
                        isOneToOne: false
                        referencedRelation: "rooms"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "listeners_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            profiles: {
                Row: {
                    created_at: string
                    email: string
                    firstname: string
                    id: number
                    lastname: string
                    role: string
                    rooms_joined: number
                    user_id: string
                }
                Insert: {
                    created_at?: string
                    email: string
                    firstname: string
                    id?: number
                    lastname: string
                    role: string
                    rooms_joined: number
                    user_id: string
                }
                Update: {
                    created_at?: string
                    email?: string
                    firstname?: string
                    id?: number
                    lastname?: string
                    role?: string
                    rooms_joined?: number
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "roles_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: true
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            rooms: {
                Row: {
                    created_at: string
                    dj_id: number | null
                    id: number
                    name: string | null
                }
                Insert: {
                    created_at?: string
                    dj_id?: number | null
                    id?: number
                    name?: string | null
                }
                Update: {
                    created_at?: string
                    dj_id?: number | null
                    id?: number
                    name?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "rooms_dj_id_fkey"
                        columns: ["dj_id"]
                        isOneToOne: false
                        referencedRelation: "dj"
                        referencedColumns: ["id"]
                    },
                ]
            }
            users_role: {
                Row: {
                    created_at: string
                    id: number
                    role: string
                    user_id: string | null
                }
                Insert: {
                    created_at?: string
                    id?: number
                    role: string
                    user_id?: string | null
                }
                Update: {
                    created_at?: string
                    id?: number
                    role?: string
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "users_role_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database
    }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
              Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
          Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
            PublicSchema["Views"])
      ? (PublicSchema["Tables"] &
            PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
          ? R
          : never
      : never

export type TablesInsert<
    PublicTableNameOrOptions extends
        | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
      ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
            Insert: infer I
        }
          ? I
          : never
      : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
        | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
      ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
            Update: infer U
        }
          ? U
          : never
      : never

export type Enums<
    PublicEnumNameOrOptions extends
        | keyof PublicSchema["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
      ? PublicSchema["Enums"][PublicEnumNameOrOptions]
      : never
