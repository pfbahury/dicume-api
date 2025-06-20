import { Request, Response } from "express";
import { supabase } from "../db/db";


export async function googleAuth(req: Request, res: Response) {
    const {id_token} = req.body;

    if (!id_token) {
        res.status(400).json({
            success: false,
            message: 'Token de ID do Google é obrigatório'
        });
        return;
    }

    try {
        const {data, error} = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: id_token,
        });

        if (error) {
            res.status(401).json({
                success: false,
                message: error.message
            })
            return;
        }

        res.status(200).json({
            success: true,
            session: data.session,
            user: data.user
        })
    } catch (error) {
        console.error('Erro inesperado durante a autenticação Google:', error);
        res.status(500).json({ 
            sucess: false,
            error: 'Erro interno do servidor.' 
        });       
    }
}