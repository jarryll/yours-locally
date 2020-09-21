module.exports = (dbPoolInstance) => {

  const getLoginSeller = (username, password, callback) => {
    let query = `SELECT * FROM sellers where username = '${username}' AND hashed_password='${password}'`
    dbPoolInstance.query(query, (err, queryResult) => {
      if (err) {
        callback(err, null)
      } else {
        if (queryResult.rows.length < 1) {
          callback(err, "username and password is incorrect, please verify and re-enter")
        } else {
          if (queryResult.rows[0].hashed_password !== `${password}`) {
            callback(err, "username and password is incorrect, please verify and re-enter")
          } else { callback(err, queryResult.rows[0]); }
        }
      }
    })
  }

  const getRegisterSeller = (username, password, callback) => {
    let query = `INSERT INTO sellers (username,hashed_password) VALUES ('${username}','${password}') RETURNING *`
    dbPoolInstance.query(query, (err, result) => {
      callback(err, result)
    })
  }

  const getLoginUser = (username, password, callback) => {
    let query = `SELECT * FROM users where username = '${username}' AND hashed_password='${password}'`
    dbPoolInstance.query(query, (err, queryResult) => {
      if (err) {
        callback(err, null)
      } else {
        if (queryResult.rows.length < 1) {
          callback(err, "username and password is incorrect, please verify and re-enter")
        } else {
          if (queryResult.rows[0].hashed_password !== `${password}`) {
            callback(err, "username and password is incorrect, please verify and re-enter")
          } else { callback(err, queryResult.rows[0]); }
        }
      }
    })
  }

  const getRegisterUser = (username, password, callback) => {
    let query = `INSERT INTO users (username,hashed_password) VALUES ('${username}','${password}') RETURNING *`
    dbPoolInstance.query(query, (err, result) => {
      callback(err, result)
    })
  }



  return {
    getLoginSeller,
    getRegisterSeller,
    getLoginUser,
    getRegisterUser
  }
}