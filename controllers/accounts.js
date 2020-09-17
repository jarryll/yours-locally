const sha256 = require('js-sha256');
const SALT = "homebasedbusiness123"

module.exports = (db) => {

let test = (request,response) => {
        const {description} = request.body;
        db.accounts.getTest(description,(err,result)=>{
                response.cookie("test", "test")
                response.json(result)
            })
    }

const login = (request,response) => {
        let {username,password} = request.body;
        password = sha256(password);
        db.accounts.getLogin(username,password,(err,result)=>{
                if(err){
                    console.log(err)
                response.send(err)
            }else {
              if (result === "no such user!" || result === "wrong password"){
                response.status(404).send(result)
              } else {
                console.log(result)
                    const idConfig = result.id;
                      response.cookie('id',sha256(`${SALT}${result.id}`))
                      response.cookie('random', idConfig)
                      response.cookie('logIn', sha256(`${SALT}true`))//
                      response.send('loggedIn!')
                }
        }
        })
    }

    const register = (request,response) => {
        let {username, password} = request.body;
        password = sha256(password)
        db.accounts.getRegister(username,password,(err,result)=>{
            response.send('account registered!')
        })
    }


 return{
    test,
    register,
    login
    }
}