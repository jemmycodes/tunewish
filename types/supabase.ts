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
                    dj_id?: string
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
                        isOneToOne: true
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            listeners: {
                Row: {
                    created_at: string
                    id: number
                    listener_id: string | null
                    room_id: string | null
                    username: string
                }
                Insert: {
                    created_at?: string
                    id?: number
                    listener_id?: string | null
                    room_id?: string | null
                    username: string
                }
                Update: {
                    created_at?: string
                    id?: number
                    listener_id?: string | null
                    room_id?: string | null
                    username?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "listener_listener_id_fkey"
                        columns: ["listener_id"]
                        isOneToOne: true
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "listener_room_id_fkey"
                        columns: ["room_id"]
                        isOneToOne: false
                        referencedRelation: "rooms"
                        referencedColumns: ["room_id"]
                    },
                ]
            }
            listeners_room: {
                Row: {
                    created_at: string
                    id: number
                    is_active: boolean | null
                    listener_id: string | null
                    room_id: string | null
                }
                Insert: {
                    created_at?: string
                    id?: number
                    is_active?: boolean | null
                    listener_id?: string | null
                    room_id?: string | null
                }
                Update: {
                    created_at?: string
                    id?: number
                    is_active?: boolean | null
                    listener_id?: string | null
                    room_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "listeners_room_listener_id_fkey"
                        columns: ["listener_id"]
                        isOneToOne: false
                        referencedRelation: "listeners"
                        referencedColumns: ["listener_id"]
                    },
                    {
                        foreignKeyName: "listeners_room_room_id_fkey"
                        columns: ["room_id"]
                        isOneToOne: false
                        referencedRelation: "rooms"
                        referencedColumns: ["room_id"]
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
                    user_id: string
                    username: string
                }
                Insert: {
                    created_at?: string
                    email: string
                    firstname: string
                    id?: number
                    lastname: string
                    role: string
                    user_id?: string
                    username: string
                }
                Update: {
                    created_at?: string
                    email?: string
                    firstname?: string
                    id?: number
                    lastname?: string
                    role?: string
                    user_id?: string
                    username?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "profile_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            rooms: {
                Row: {
                    created_at: string
                    description: string
                    dj_id: string | null
                    dress_code: string | null
                    id: number
                    location: string
                    message: string | null
                    name: string
                    room_id: string
                }
                Insert: {
                    created_at?: string
                    description: string
                    dj_id?: string | null
                    dress_code?: string | null
                    id?: number
                    location?: string
                    message?: string | null
                    name: string
                    room_id?: string
                }
                Update: {
                    created_at?: string
                    description?: string
                    dj_id?: string | null
                    dress_code?: string | null
                    id?: number
                    location?: string
                    message?: string | null
                    name?: string
                    room_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "rooms_dj_id_fkey"
                        columns: ["dj_id"]
                        isOneToOne: false
                        referencedRelation: "dj"
                        referencedColumns: ["dj_id"]
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
