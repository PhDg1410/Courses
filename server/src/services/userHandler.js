import jwt from "jsonwebtoken"
import db from "../models/index"
import user from "../models/user"
require("dotenv").config()



//sign-up : dang ky
//hashPassword
//done
let register = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            //check input
            if(!data.username||!data.password||!data.email){
                resolve({
                    "errorCode":12,
                    "message":"invalid input"
                })
            }
            let user = await db.User.findOne({
                where : { email : data.email }
            })
            if(!user){
                let newUser = await db.User.create({
                    userName : data.userName,
                    email : data.email,
                    role: "user",
                    active: true,
                    totalPass : 0,
                    password : data.password
                })
                if(newUser){
                    resolve({
                        "errorCode":10,
                        "message":"sign up success"
                    })
                }else{
                    resolve({
                        "errorCode":11,
                        "message":"registration failed"
                    })
                }
            }else{
                resolve({
                    "errorCode":13,
                    "message":"Email already used"
                })
            }
        }catch(e){
            console.log(e)
            reject({
                "errorCode":0,
                "message":"Internal Server"
            })
        }
    })
}

//sign-in : dang nhap
//done
let logIn = (data) => {
    return new Promise(async(resolve,reject) => {
        try{
            if(!data.email||!data.password){
                resolve({
                    "errorCode":23,
                    "message":"Invalid input"
                })
            }
            let infor = await db.User.findOne({
                where : {email : data.email}
            })
            if(infor){
                if(infor.password===data.password){
                    resolve({
                        "errorCode":20,
                        "message":"Login success!",
                        "infor":{
                            "id":infor.id,
                            "userName":infor.userName,
                            "email":infor.email,
                            "totalPass":infor.totalPass
                        }
                    })
                }else{
                    resolve({
                        "errorCode":21,
                        "message":"Login fail"
                    })
                }
            }else{
                resolve({
                    "errorCode":22,
                    "message":"Invalid email or password "
                })
            }

        }catch(e){
            console.log(e)
            reject({
                "errorCode":0,
                "message":"Internal Server"
            })
        }
    })

}

//get profile 
let getProfileById = (token) =>{
    return new Promise(async(resolve,reject) => {
        try{
            if(!token){
                resolve({
                    "errorCode":33,
                    "message":"Invalid token"
                })
            }
            let key = process.env.SECRET_KEY
            let verify = await jwt.verify(token,key)
            if(!verify){
                resolve({
                    "errorCode":33,
                    "message":"Invalid token"
                })
            }
            let userid = verify.id
            let user = await db.User.findOne({
                where : {id : userid }
            })
            if(user){
                resolve({
                    "errorCode":30,
                    "message":"User found",
                    "user":{
                        id : user.id,
                        email : user.email,
                        userName:user.userName,
                        totalPass:user.totalPass
                    }
                })
            }else{
                resolve({
                    "errorCode":31,
                    "message":"User not found"
                })
            }
        }catch(e){
            console.log(e)
            reject({
                "errorCode":0,
                "message":"Internal Server"
            })
        }
    })
    
}

//delete user 

let deleteUserById = (data) => {
    return new Promise(async(resolve,reject) => {
        try{
            if(!data){
                resolve({
                    "errorCode":41,
                    "message":"Invalid token"
                })
            }
            let userid = data.id
            let user = await db.User.findOne({
                where : {id : userid}
            })
            if(!userid){
                resolve({
                    "errorCode":42,
                    "message":"User not found"
                })
            }else{
                let isSuccess = await user.destroy()
                if(isSuccess){
                    resolve({
                        "errorCode":40,
                        "message":"Delete success"
                    })
                }else{
                    resolve({
                        "errorCode":43,
                        "message":"Dele"
                    })
                }

            }
            
        }catch(e){
            console.log(e)
            reject({
                "errorCode":0,
                "message":"Internal Server"

            })
        }
    })
}
 





module.exports = {
    register:register,
    logIn:logIn,
    getProfileById:getProfileById,
    deleteUserById:deleteUserById
}