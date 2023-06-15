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
                    "errorCode":4,
                    "status":"invalid input datatype"
                })
            }
            let user = await db.User.findOne({
                where : { email : data.email }
            })
            if(!user){
                let newUser = await db.User.create({
                    userName : data.username,
                    email : data.email,
                    role: "user",
                    active: true,
                    totalPass : 0,
                    password : data.password
                })
                if(newUser){
                    resolve({
                        "errorCode":0,
                        "status":"Success"
                    })
                }else{
                    resolve({
                        "errorCode":1,
                        "status":"Fail"
                    })
                }
            }else{
                resolve({
                    "errorCode":1,
                    "status":"Fail",
                    "message":"Email already used"
                })
            }
        }catch(e){
            console.log(e)
            reject({
                "errorCode":6,
                "status":"Internal Server"
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
                    "errorCode":4,
                    "status":"Invalid input datatype"
                })
            }
            let infor = await db.User.findOne({
                where : {email : data.email}
            })
            if(infor){
                if(infor.password===data.password){
                    resolve({
                        "errorCode":0,
                        "status":"Success",
                        "infor":{
                            "id":infor.id,
                            "userName":infor.userName,
                            "email":infor.email,
                            "totalPass":infor.totalPass
                        }
                    })
                }else{
                    resolve({
                        "errorCode":1,
                        "status":"Fail"
                    })
                }
            }else{
                resolve({
                    "errorCode":2,
                    "status":"Data not found",
                    "message":"Invalid email or password"
                })
            }

        }catch(e){
            console.log(e)
            reject({
                "errorCode":0,
                "status":"Internal Server"
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
                    "errorCode":5,
                    "status":"Invalid token"
                })
            }
            let key = process.env.SECRET_KEY
            let verify = await jwt.verify(token,key)
            if(!verify){
                resolve({
                    "errorCode":5,
                    "status":"Invalid token"
                })
            }
            let userid = verify.id
            let user = await db.User.findOne({
                where : {id : userid }
            })
            if(user){
                resolve({
                    "errorCode":0,
                    "status":"Success",
                    "user":{
                        id : user.id,
                        email : user.email,
                        userName:user.userName,
                        totalPass:user.totalPass
                    }
                })
            }else{
                resolve({
                    "errorCode":2,
                    "status":"Data not found"
                })
            }
        }catch(e){
            console.log(e)
            reject({
                "errorCode":0,
                "status":"Internal Server"
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
                    "errorCode":5,
                    "status":"Invalid token"
                })
            }
            let userid = data.id
            let user = await db.User.findOne({
                where : {id : userid}
            })
            if(!userid){
                resolve({
                    "errorCode":2,
                    "status":"Data not found"
                })
            }else{
                let isSuccess = await user.destroy()
                if(isSuccess){
                    resolve({
                        "errorCode":0,
                        "status":"Success"
                    })
                }else{
                    resolve({
                        "errorCode":1,
                        "status":"Fail"
                    })
                }
            }   
        }catch(e){
            console.log(e)
            reject({
                "errorCode":0,
                "status":"Internal Server"

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