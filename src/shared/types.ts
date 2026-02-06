import z from "zod";

export const UserProfileSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  coins: z.number(),
  plan: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

export const VideoSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  name: z.string(),
  theme: z.string().nullable(),
  file_url: z.string().nullable(),
  thumbnail_url: z.string().nullable(),
  size_mb: z.number().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Video = z.infer<typeof VideoSchema>;

export const CoinTransactionSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  amount: z.number(),
  description: z.string().nullable(),
  balance_after: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type CoinTransaction = z.infer<typeof CoinTransactionSchema>;

export const CreateVideoRequestSchema = z.object({
  name: z.string(),
  age: z.number(),
  theme: z.string(),
  image_count: z.number().min(3).max(12),
  emotion: z.string(),
  message: z.string(),
  ai_model: z.string(),
});

export type CreateVideoRequest = z.infer<typeof CreateVideoRequestSchema>;

export interface DashboardStats {
  videos_created: number;
  images_generated: number;
  songs_created: number;
}
