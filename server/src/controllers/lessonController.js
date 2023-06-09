import db from '../models/index'
import lessonHandler from "../services/lessonHandler"
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import user from '../models/user'

require("dotenv").config()

//create lesson

let createLesson = async (req,res) => {
    try{
        let lesson = await lessonHandler.createNewLesson(req.body)
        if(lesson){
            res.status(200).json("new lesson created")
        }
    }catch(e){
        console.log(e)
        res.status(200).json("error")
    }

}


//create lesson 

let getLesson = async (req,res) => {
    try{
        let lessonid = req.body.id
        let lesson = await lessonHandler.getLessonById(lessonid)
        if(lesson){
            res.status(200).json(lesson)
        }else{
            res.status.json("lesson not found")
        }

    }catch(e){
        console.log(e)
        res.status(200).json("error")
    }
}

//delete lesson 

let deleteLesson = async(req,res) => {
    try{
        let lessonid = req.body.id
        let isSuccess = await lessonHandler.deleteLessonById(lessonid)
        if(isSuccess){
            res.status(200).json("delete lesson success")
        }else{
            res.status(200).json("something wrong")
        }
    }catch(e){
        console.log(e)
        res.status(200).json("error")
    }
}




module.exports = {
    createLesson:createLesson,
    getLesson:getLesson,
    deleteLesson:deleteLesson
    
}