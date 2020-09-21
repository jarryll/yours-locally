const sha256 = require('js-sha256');
const SALT = "homebasedbusiness123"

module.exports = (db) => {

    let test = (request, response) => {
        const { description } = request.body;
        db.accounts.getTest(description, (err, result) => {
            response.cookie("test", "test")
            response.json(result)
        })
    }

    const loginSeller = (request, response) => {
        let { username, password } = request.body;
        password = sha256(password);
        db.accounts.getLoginSeller(username, password, (err, result) => {
            if (err) {
                console.log(err)
                response.send(err)
            } else {
                if (result === "username and password is incorrect, please verify and re-enter") {
                    response.send({ result })
                } else {
                    const username = result.username
                    const idConfig = result.id;
                    response.cookie('id', sha256(`${SALT}${result.id}`))
                    response.cookie('random', idConfig)
                    response.cookie('username', username)
                    response.cookie('logIn', sha256(`${SALT}true`))
                    response.send({ id: idConfig })
                }
            }
        })
    }

    const registerSeller = (request, response) => {
        let { username, password } = request.body;
        password = sha256(password)
        db.accounts.getRegisterSeller(username, password, (err, result) => {
            response.send('account registered!')
        })
    }

    const loginUser = (request, response) => {
        let { username, password } = request.body;
        password = sha256(password);
        db.accounts.getLoginUser(username, password, (err, result) => {
            if (err) {
                console.log(err)
                response.send(err)
            } else {
              if (result === "username and password is incorrect, please verify and re-enter"){
                response.send({result})
              } else {
                      const username = result.username
                      const idConfig = result.id;
                      response.cookie('logIn', sha256(`${SALT}true`));
                      response.cookie('username', username)
                      response.cookie('user', idConfig);
                      response.send({})
                }
            }
        })
    }

    const registerUser = (request, response) => {
        let { username, password } = request.body;
        password = sha256(password)
        db.accounts.getRegisterUser(username, password, (err, result) => {
            response.send('account registered!')
        })
    }

    return {
        test,
        registerSeller,
        loginSeller,
        registerUser,
        loginUser
    }
}