import { Request, Response, NextFunction } from "express";
import { supabase } from "../db/db";

declare global {
    namespace Express { 
        interface Request{
            user?: any;
        }
    }
}


export async function autheticateJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            success: false,
            error: 'Token de autenticação não fornecido'
        })
        return;
    }

    const token = authHeader.split(' ')[1];

    try{
        const {data: {user}, error } = await supabase.auth.getUser(token);    
        if (error || !user){
            console.error('Erro de validação JWT:', error?.message || 'Usuário não encontrado.');
            res.status(401).json({
                success: false,
                error: "Token JWT expirado ou inválido"
            })
            return;
        }

        req.user = user;
        next();
    } catch(err){
        console.error('Erro no middleware do JWT: ', err)
        res.status(500).json({
            success: false,
            error: "Erro interno durante a autenticação"
        })
    }   

}