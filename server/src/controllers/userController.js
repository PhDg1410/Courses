import db from '../models/index'
import userHandler from "../services/userHandler"
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import user from '../models/user'
import { where } from 'sequelize'
import tokenHandler from "../services/tokenHandler"
require("dotenv").config()

//sign-up 
//done
let signUp = async(req,res) => {
    try{
        let user = await userHandler.register(req.body)
        res.status(200).json(user)

    }catch(e){
        console.log(e)
        res.status(500).json({
            "errorCode":6,
            "status":"Internal Server"
        })
    }
}

//sign-in 
//done
let signIn = async(req,res) => {
    let user = await userHandler.logIn(req.body)
    if(user.errorCode===20){
        // let token = await tokenHandler.genToken({"userid":user.id})
        let key = process.env.SECRET_KEY
        let payload = {id : user.infor.id}
        console.log(payload)
        let token = await jwt.sign(payload,key)
        if(!token){
            res.status(200).json({
                "errorCode":1,
                "status":"Fail",
                "message":"Create token failed"
            })
        }else{
            res.cookie("accessToken",token,{ maxAge: 3600000, httpOnly: true })
            res.status(200).json(user)
        }
        
    }else{
        res.status(200).json(user)
    }
}

//get profile
//* error handle
//done
let profile = async (req,res) => {
    try{
        let token = req.cookies.accessToken
        let response = await userHandler.getProfileById(token)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.status(500).json({
            "errorCode":6,
            "status":"Internal Server"
        })
    }

}

//update profile 


//delete user 

let deleteUser =async (req,res) => {
    try{
        let isSuccess = await userHandler.deleteUserById(req.body)
        if(isSuccess){
            res.status(200).json(isSuccess)
        }
    }catch(e){
        console.log(e)
        res.status(500).json({
            "errorCode":0,
            "status":"Internal Server"
        })
    }
}






module.exports = {
    signUp:signUp,
    signIn:signIn,
    profile:profile,
    deleteUser:deleteUser
}