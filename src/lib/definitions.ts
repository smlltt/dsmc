import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number().int().nullable(),
  adult: z.boolean(),
  backdrop_path: z.string(),
  genre_ids: z.array(z.number().int()),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type MovieSchemaType = z.infer<typeof MovieSchema>;