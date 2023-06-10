import jwt from "jsonwebtoken"
import db from "../models/index"
import user from "../models/user"
require("dotenv").config()

//create course 

let createCourse = (data) => {
    return new Promise(async(resolve,reject) => {
        try{
            let isExist = await db.Course.findOne({
                where : { courseName : data.courseName }
            })
            if(!isExist){
                let newCourse = await db.Course.create({
                    courseName : data.courseName,
                    description : data.description,
                    price : data.price
                })
                resolve({
                    "errorCode":0,
                    "status":"Success",
                    "newCourse":{
                        newCourse
                    }
                })
            }else{
                resolve({
                    "errorCode":1,
                    "status":"Fail",
                    "message":"Course already exist"
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


//get all course 

let getAllCourse = () => {
    return new Promise(async(resolve,reject) => {
        try{
            let allCourse = await db.Course.findAll()
            if(allCourse){
                resolve({
                    "errorCode":0,
                    "status":"Success",
                    allCourse
                })
            }else{
                resolve({
                    "errorCode":1,
                    "status":"Fail"
                })
            }
        }catch(e){
            reject({
                "errorCode":6,
                "status":"Internal Server"
            })
        }
    })
}


//delete course

let deleteCourseById = (courseid) => {
    return new Promise(async (resolve,reject) => {
        try{
            let course = await db.Course.findOne({
                where : { id: courseid}
            })
            if(course){
                let isSuccess = await course.destroy()
                console.log(isSuccess)
                resolve({
                    "errorCode":0,
                    "status":"Success"
                })
            }else{
                resolve({
                    "errorCode":1,
                    "status":"Fail",
                    "message":"Course does not exist"
                })
            }
        }catch(e){
            reject({
                "errorCode":6,
                "status":"Internal Server"
            })
        }
    })
}


module.exports = {
    createCourse : createCourse,
    getAllCourse : getAllCourse,
    deleteCourseById:deleteCourseById
}