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
      alimentos: {
        Row: {
          classificacao_cor: string
          foto_porcao_url: string
          grupo_dicume: string
          grupo_nutricional: string
          guia_alimentar_class: string
          id: string
          ig_classificacao: string
          nome_popular: string
          recomendacao_consumo: string
        }
        Insert: {
          classificacao_cor: string
          foto_porcao_url: string
          grupo_dicume: string
          grupo_nutricional: string
          guia_alimentar_class: string
          id?: string
          ig_classificacao: string
          nome_popular: string
          recomendacao_consumo: string
        }
        Update: {
          classificacao_cor?: string
          foto_porcao_url?: string
          grupo_dicume?: string
          grupo_nutricional?: string
          guia_alimentar_class?: string
          id?: string
          ig_classificacao?: string
          nome_popular?: string
          recomendacao_consumo?: string
        }
        Relationships: []
      }
      refeicao_itens: {
        Row: {
          alimento_id: string
          id: string
          quantidade_base: number
          quantidade_desc: string
          refeicao_id: string
        }
        Insert: {
          alimento_id?: string
          id?: string
          quantidade_base: number
          quantidade_desc: string
          refeicao_id?: string
        }
        Update: {
          alimento_id?: string
          id?: string
          quantidade_base?: number
          quantidade_desc?: string
          refeicao_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "refeicao_itens_alimento_id_fkey"
            columns: ["alimento_id"]
            isOneToOne: false
            referencedRelation: "alimentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refeicao_itens_refeicao_id_fkey"
            columns: ["refeicao_id"]
            isOneToOne: false
            referencedRelation: "refeicoes"
            referencedColumns: ["id"]
          },
        ]
      }
      refeicoes: {
        Row: {
          classificacao_final: string
          created_at: string
          data_refeicao: string
          id: string
          tipo_refeicao: string
          usuario_id: string
        }
        Insert: {
          classificacao_final: string
          created_at: string
          data_refeicao: string
          id?: string
          tipo_refeicao: string
          usuario_id?: string
        }
        Update: {
          classificacao_final?: string
          created_at?: string
          data_refeicao?: string
          id?: string
          tipo_refeicao?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "refeicoes_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          bairro: string | null
          cidade: string | null
          created_at: string
          data_nascimento: string | null
          escolaridade: string | null
          faz_acompanhamento_medico: boolean | null
          genero: string | null
          id: string
          nom_exibicao: string
          telefone: string
        }
        Insert: {
          bairro?: string | null
          cidade?: string | null
          created_at?: string
          data_nascimento?: string | null
          escolaridade?: string | null
          faz_acompanhamento_medico?: boolean | null
          genero?: string | null
          id?: string
          nom_exibicao: string
          telefone: string
        }
        Update: {
          bairro?: string | null
          cidade?: string | null
          created_at?: string
          data_nascimento?: string | null
          escolaridade?: string | null
          faz_acompanhamento_medico?: boolean | null
          genero?: string | null
          id?: string
          nom_exibicao?: string
          telefone?: string
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
