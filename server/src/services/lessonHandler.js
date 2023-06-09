import db from "../models/index"


//create lesson 

let createNewLesson = (data) => {
    return new Promise(async (resolve,reject) => {
        try{
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
                resolve(newLesson)
            }      
        }catch(e){
            reject(e)
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
                resolve(lesson)
            }else{
                resolve(false)
            }
        }catch(e){
            reject(e)
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
            let isSuccess = await lesson.destroy()
            if(isSuccess){
                resolve(isSuccess)
            }else{
                resolve(false)
            }

        }catch(e){
            reject(e)
        }
    })

}

module.exports = {
    createNewLesson:createNewLesson,
    getLessonById:getLessonById,
    deleteLessonById:deleteLessonById
}