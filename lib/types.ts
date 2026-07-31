export interface DailyEntry {
  entry_date: string; // 'YYYY-MM-DD'
  activity_label: string | null;
  water_count: number;
  kcal_intake_count: number;
  kcal_burn_count: number;
  mood: string | null;
  location: string | null;
  comment: string | null;
  notes: string | null;
  photo_url_1: string | null;
  photo_url_2: string | null;
  updated_at?: string;
}

export interface WeeklyNote {
  week_start: string; // 'YYYY-MM-DD' (Pazartesi)
  notes: string | null;
  photo_url: string | null;
  updated_at?: string;
}
