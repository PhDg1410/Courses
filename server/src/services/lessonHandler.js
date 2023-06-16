import db from "../models/index"
import logError from "../log/logError"


//create lesson 

let createNewLesson = (data) => {
    return new Promise(async (resolve,reject) => {
        try{
            let checkCourse = await db.Course.findOne({
                where : {id : data.course_id}
            })
            if(!checkCourse){
                resolve({
                    "errorCode":2,
                    "status":"Data not found",
                    "message":'Course not found'
                })
            }else{
                let isExist = await db.Lesson.findOne({
                    where : {lessonName : data.lessonName}
                })
                if(!isExist){
                    let newLesson = await db.Lesson.create({
                        lessonName : data.lessonName,
                        course_id: data.course_id,
                        description: data.description,
                        detail: data.detail
                    })
                    resolve({
                        "errorCode":0,
                        "status":"Success",
                        newLesson
                    })
                }else{
                    resolve({
                        "errorCode":1,
                        "status":"Fail"
                    })
                }
            }
            
        }catch(e){
            // logError.logger.error(e, { functionName: createNewLesson.name });
            console.log(e)
            reject({
                "errorCode":6,
                "status":"Internal Server"
            })
        }
    })
}

//get lesson 

let getLessonById = (lessonid) => {
    return new Promise(async(resolve,reject) => {
        try{
            let lesson = await db.Lesson.findOne({
                where : { id : lessonid }
            })
            if(lesson){
                resolve({
                    "errorCode":0,
                    "message":"Success",
                    lesson
                })
            }else{
                resolve({
                    "errorCode":2,
                    "status":"Data not found",
                    "message":"Lesson not found"
                })
            }
        }catch(e){
            // logError.logger.error(e, { functionName: getLessonById.name });
            console.log(e)
            reject({
                "errorCode":6,
                "status":"Internal Server"
            })
        }
    })

}

//delete lesson 

let deleteLessonById = (lessonid) => {
    return new Promise(async(resolve,reject) => {
        try{
            let lesson = await db.Lesson.findOne({
                where : {id : lessonid}
            })
            if(!lesson){
                resolve({
                    "errorCode":2,
                    "status":"Data not found",
                    "message":"Lesson not found"
                })
            }else{
                let isSuccess = await lesson.destroy()
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
            // logError.logger.error(e, { functionName: deleteLessonById.name });
            console.log(e)
            reject({
                "errorCode":6,
                "status":"Internal Server"
            })
        }
    })

}

module.exports = {
    createNewLesson:createNewLesson,
    getLessonById:getLessonById,
    deleteLessonById:deleteLessonById
}