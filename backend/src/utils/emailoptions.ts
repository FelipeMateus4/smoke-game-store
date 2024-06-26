import sgMail from "@sendgrid/mail";
import { config } from "dotenv";

config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendTokenEmail = async (email: any, token: any) => {
    const confirmationUrl = `http://localhost:3000/account/register/authenticate?token=${token}`;
    const msg = {
        to: email,
        from: "dropzin01@gmail.com",
        subject: "Seu Token de Autenticação",
        text: `Clique no link para confirmar a criação de sua conta: ${confirmationUrl}`,
        html: `<p>Clique no link para confirmar seu e-mail: <a href="${confirmationUrl}">Confirmar E-mail</a></p>`,
    };

    try {
        await sgMail.send(msg);
        console.log("Email enviado");
    } catch (error) {
        console.error("Erro ao enviar email: " + error);
    }
};

export const sendTokenEmailLogin = async (email: any, token: any) => {
    const msg = {
        to: email,
        from: "dropzin01@gmail.com", // Endereço de email verificado no SendGrid
        subject: "Seu Token de Autenticação",
        text: `Aqui está seu token de autenticação: ${token}`,
        html: `<p>Aqui está seu token de autenticação: <b>${token}</b></p>`,
    };

    try {
        await sgMail.send(msg);
        console.log("Email enviado");
    } catch (error) {
        console.error("Erro ao enviar email: " + error);
    }
};
