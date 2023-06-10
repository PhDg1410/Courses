import db from '../models/index'
import courseHandler from "../services/courseHandler"
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import user from '../models/user'
import { where } from 'sequelize'
require("dotenv").config()

//create new course 

let createNewCourse = async (req,res) =>{
    try{
        let newCourse = await courseHandler.createCourse(req.body)
        res.status(200).json(newCourse)
    }catch(e){
        console.log(e)
        res.status(200).json({
            "errorCode":6,
            "status":"Internal Server"
        })
    }
}

//get course 

let getCourse = async (req,res) => {
   try{
    let course = await courseHandler.getAllCourse()
    res.status(200).json(course)

   }catch(e){
        res.status(500).json({
            "errorCode":6,
            "status":"Internal Server"
        })
   }
}


//delete course 

let deleteCourse =async (req,res) => {
    try{
        let courseid = req.body.id
        let result = await courseHandler.deleteCourseById(courseid)
        res.status(200).json(result)

    }catch(e){
        res.status(500).json({
            "errorCode":6,
            "status":"Internal Server"
        })
    }
}


module.exports = {
    createNewCourse : createNewCourse,
    getCourse:getCourse,
    deleteCourse:deleteCourse
}