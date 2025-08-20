import client from "@/lib/client"
//login
export const login = async (data: { email: string, password: string }) => {
    const res = await client.post('/api/auth/login', data)
    return res.data;
}
//signup
export const signup = async (data: { name: string, email: string, password: string, role?: string }) => {
    const res = await client.post('/api/auth/register', data)
    return res.data;
}
//forgotpassword
export const ResetLink = async (data: { email: string }) => {
    const res = await client.post("/api/auth/forgotPassword", data)
    return res.data;
}
//Resetpassword
export const ResetPassword = async (data: { token: string, newPassword: string }) => {
    const res = await client.post(`/api/auth/reset-password/${data.token}`, {
        newPassword: data.newPassword
    })
    console.log("new user password is", data.newPassword);
    return res.data;
}


