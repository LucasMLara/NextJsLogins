"use server"

import db from '@/lib/db';
import { hashSync } from 'bcrypt-ts';
import { redirect } from 'next/navigation';

export default async function Register(formData: FormData) {
    // const name = formData.get('name');
    // const email = formData.get('email');
    // const password = formData.get('password');
    const entries = Array.from(formData.entries());
    const { email, name, password } = Object.fromEntries(entries) as {
        name: string;
        email: string;
        password: string;
    };

    if(!name || !email || !password) {
        throw new Error('Preencha todos os campos');
    }
    
    const userExists = await db.user.findUnique({
        where: {
            email   
        }
    })

    if(userExists) {
        throw new Error('Usuário já existe');
    }   

    await db.user.create({
        data: {
            email,
            name,
            password: hashSync(password)
        }
    })
    
    redirect('/')

    
}