export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      universities: {
        Row: {
          id: string
          user_id: string
          name: string
          country: string
          program: string
          deadline: string
          portal_link: string | null
          fee: number
          status: 'Not started' | 'In progress' | 'Submitted' | 'Interview' | 'Accepted' | 'Rejected'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['universities']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['universities']['Insert']>
      }
      documents: {
        Row: {
          id: string
          university_id: string
          type: string
          file_url: string | null
          completed: boolean
        }
        Insert: Omit<Database['public']['Tables']['documents']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['documents']['Insert']>
      }
      exam_tracker: {
        Row: {
          id: string
          user_id: string
          ielts_date: string | null
          target_score: number | null
          achieved_score: number | null
          gre_score: number | null
        }
        Insert: Omit<Database['public']['Tables']['exam_tracker']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['exam_tracker']['Insert']>
      }
      cost_tracker: {
        Row: {
          id: string
          user_id: string
          ielts_cost: number
          courier_cost: number
          visa_fee: number
        }
        Insert: Omit<Database['public']['Tables']['cost_tracker']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['cost_tracker']['Insert']>
      }
      subscriptions: {
        Row: {
          user_id: string
          plan_type: 'free' | 'premium'
          expiry_date: string | null
        }
        Insert: Database['public']['Tables']['subscriptions']['Row']
        Update: Partial<Database['public']['Tables']['subscriptions']['Insert']>
      }
    }
  }
}

// Convenience types
export type University = Database['public']['Tables']['universities']['Row']
export type Document = Database['public']['Tables']['documents']['Row']
export type ExamTracker = Database['public']['Tables']['exam_tracker']['Row']
export type CostTracker = Database['public']['Tables']['cost_tracker']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type ApplicationStatus = University['status']
