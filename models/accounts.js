module.exports = (dbPoolInstance) => {

let getTest = (description,callback) => {
    let query=`INSERT INTO test (description) VALUES('${description}') RETURNING *`
    dbPoolInstance.query(query,(err,result)=>{
        callback(err,result)
    })
}

const getLogin = (username,password,callback)=>{
    let query = `SELECT * FROM sellers where username = '${username}' AND hashed_password='${password}'`
     dbPoolInstance.query(query,(err,queryResult)=>{
       if(err){
        callback(err,null)
      } else {
        if( queryResult.rows.length<1){
          callback(err,"no such user!")
        } else{
          if(queryResult.rows[0].hashed_password !== `${password}`){
            callback(err,"wrong password")
          } else{callback(err,queryResult.rows[0]);}
        }
      }
    })
}

const getRegister = (username,password,callback)=>{
    let query=`INSERT INTO sellers (username,hashed_password) VALUES ('${username}','${password}') RETURNING *`
    dbPoolInstance.query(query,(err,result)=>{
        callback(err,result)
    })
}

    return {
        getTest,
        getLogin,
        getRegister
    }
}