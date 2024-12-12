'use server'

import { signIn } from "@/auth";


export default async function LoginGitHub(formData: FormData) {

    
    await signIn('github')

    

}