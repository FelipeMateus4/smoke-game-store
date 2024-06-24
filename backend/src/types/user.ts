import { verify } from "jsonwebtoken";
import { z } from "zod";

const User = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string(),
    verify: z.boolean().default(false),
});

type User = z.infer<typeof User>;

export { User as UserType };
