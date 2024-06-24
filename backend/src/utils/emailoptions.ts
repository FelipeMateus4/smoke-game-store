import sgMail from "@sendgrid/mail";
import { config } from "dotenv";

config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendTokenEmailLogin = async (email: any, token: any) => {
    const msg = {
        to: email,
        from: "dropzin01@gmail.com",
        subject: "Seu Token de Autenticação",
        text: `Seu token de autenticação é: ${token}`,
        html: `<p>Seu token de autenticação é: <strong>${token}</strong></p>`,
    };

    try {
        await sgMail.send(msg);
        console.log("Email enviado");
    } catch (error) {
        console.error("Erro ao enviar email: " + error);
    }
};
