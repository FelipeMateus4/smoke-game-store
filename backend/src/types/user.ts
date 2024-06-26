import { verify } from "jsonwebtoken";
import { z } from "zod";

const User = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string(),
    verified: z.boolean().default(false),
    secret: z.string().optional(),
});

type User = z.infer<typeof User>;

export { User as UserType };
