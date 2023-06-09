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
                resolve(newCourse)
            }else{
                //error handle
            }

        }catch(e){
            reject(e)
        }
    })

}


//get course 

let getAllCourse = () => {
    return new Promise(async(resolve,reject) => {
        try{
            let allCourse = await db.Course.findAll()
            if(allCourse){
                resolve(allCourse)
            }else{
                resolve(false)
            }
        }catch(e){
            reject(e)
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
                resolve(isSuccess)
            }

        }catch(e){
            reject(e)
        }
    })
}


module.exports = {
    createCourse : createCourse,
    getAllCourse : getAllCourse,
    deleteCourseById:deleteCourseById
}