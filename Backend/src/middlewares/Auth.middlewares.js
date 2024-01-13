import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const verify = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") 
        console.log(token)
    
        if (!token) 
            next(new ApiError(401, 'Access denied!'))
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            
            if(err) next(new ApiError(403, 'token is not valid'));
            
            // console.log(req.get("authorization"))
            req.user = user;
            next();
        })
    } catch (error) {
        next(new ApiError(401, error?.message || "Invalide access token"))
    }
});