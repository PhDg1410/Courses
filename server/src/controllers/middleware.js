import tokenHandler from "../services/tokenHandler"

let testToken =async (req,res) => {
    let payload = {
        "id" : 1,
        "value":"test"
    }

    let token = await tokenHandler.genToken(payload)

    res.cookie("token",token,{ maxAge: 3600000, httpOnly: true })
    res.send("ok")

}

let testCheck = async (req,res) => {
    try{
        let token = req.cookies.token
        let verify = await tokenHandler.checkToken(token)
        if(verify){
        res.send("check ok")
    }

    }catch(e){
        console.log(e)
        res.send("error")
    }
}

module.exports = {
    testToken:testToken,
    testCheck:testCheck
}