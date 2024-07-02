import { verify } from "jsonwebtoken";
import { z } from "zod";

const User = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string(),
    cpf: z.string().optional(),
    nome: z.string().optional(),
    sobrenome: z.string().optional(),
    telefone: z.string().optional(),
    dataNascimento: z.date().optional(),
    verified: z.boolean().default(false),
    secret: z.string().optional(),
    securityState: z.string(),
    allowsession: z.boolean().default(false),
});

type User = z.infer<typeof User>;

export { User as UserType };
