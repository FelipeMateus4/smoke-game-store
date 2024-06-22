import { z } from "zod";

const Game = z.object({
    title: z.string(),
    price: z.number(),
    tags: z.array(z.string()),
    description: z.string(),
    platform: z.array(z.string()),
    url: z.string().optional(),
});

type Game = z.infer<typeof Game>;

export { Game as GameType };
