const moment = require('moment')
const connection = require('../infraestructure/connection')

class User { 

    listAll(res) {
        const sql = `SELECT * FROM user`

        connection.query(sql, (error, results) => {
            if(error) {
                res.status(400).send(error)
            }
            else {
                res.status(200).send(results)
            }
        })
    }

    signup(res, user) {
        const currentDate = moment().format('YYYY-MM-DD HH:mm:ss')        
        const userWithDate = {...user, signupDate: currentDate}
        
        const nameIsValid = user.name.length >= 5      
        
        const validations = [
            {
                name: 'nome',
                valid: nameIsValid,
                message: 'Username must be longer than five characters'
            }            
        ]
        
        const errors = validations.filter(validation => !validation.valid)
        
        if(errors.length > 0) {
            res.status(400).send(errors)
        }
        else {            
            const sql = `INSERT INTO user SET ?`
            connection.query(sql, userWithDate, (error, results) => {
                if(error) {
                    res.status(400).send(error)
                }
                else {
                    console.log("Registration successfully complete")
                    res.status(200).send(userWithDate)
                }
            })
        }
    }
    
    searchById(res, id) {
        const sql = `SELECT * FROM user WHERE ID = ?`
        connection.query(sql, id, (error, results) => {
            if(error) {
                res.status(400).send(error)
            }
            else {
                res.status(200).send(...results)
            }
        })
    }

    alterById(res, id, values) {
        const sql = `UPDATE user SET ? WHERE ID = ?`
        
        connection.query(sql, [values, id], (error, results) => {
            if(error) {
                res.status(400).send(error)
            }
            else {
                res.status(200).send({id, ...values})
            }
        })
    }

    deleteById(res, id) {
        const sql = `DELETE FROM user WHERE ID = ? `
        connection.query(sql, id, (error, results) => {
            if(error) {
                res.status(400).send(error)
            }
            else {
                res.status(200).send({id})
            }
        })
    }
   
    login(user, res) {
        const sql = `SELECT id, name, email FROM user WHERE name = ? AND password = ?` 
        console.log(user)                     
        connection.query(sql, [user.name, user.password], (error, results) => {
            if(error) {
                console.log(error)
            }
            else {
                console.log(results)                  
                if(results.length > 0) {
                    console.log("Login efetuado")
                    res.status(200).send(results[0])
                }
                else {
                    res.status(401).send(`Usuário ou senha incorretos`)
                }
            }
        })     
        
    }
    
    searchForUser(user) {
        const sql = `SELECT name FROM user WHERE name = ?`               
        connection.query(sql, user.Nome, (error, results) => {
            if(error) {
                console.log(error)
            }
            else {
                console.log(results.length)
                results.length > 0 ? false : true
                console.log(results.length)                  
                if(results.length > 0) {
                    return false
                }
                else {
                    return true
                }
            }
        })
    }    
}

module.exports = new User