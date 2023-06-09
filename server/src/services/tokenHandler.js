import jwt from "jsonwebtoken"
require("dotenv").config()

//generate token

let genToken = async  (payload) => {
    return new Promise(async(resolve,reject) => {
        try{
            let key = process.env.SECRET_KEY
            let token = await jwt.sign(payload,key)
            resolve(token)
        }catch(e){
            reject(e)
        }
    })
}


let verifyToken = (token) => {
    return new Promise((resolve,reject) => {
        try{
            let key = process.env.SECRET_KEY
            let isTrue = jwt.verify(token,key)
            resolve(isTrue)

        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    genToken:genToken,
    verifyToken
}