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
        
        if(newCourse){
            res.status(200).json("new course create")
        }

    }catch(e){
        console.log(e)
        res.status(200).json("error")
    }
}

//get course 

let getCourse = async (req,res) => {
   try{
    let course = await courseHandler.getAllCourse()
    res.status(200).json(course)

   }catch(e){
        res.status(200).json("error")
   }
}


//delete course 

let deleteCourse =async (req,res) => {
    let courseid = req.body.id
    let isSuccess = await courseHandler.deleteCourseById(courseid)
    if(isSuccess){
        res.status(200).json("delete course success")
    }
}


module.exports = {
    createNewCourse : createNewCourse,
    getCourse:getCourse,
    deleteCourse:deleteCourse
}