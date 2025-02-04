


const logoutController = (request,response) =>{
    response.clearCookie('auth_token', { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    }).json({ message: 'Logged out' });
}

export {logoutController};