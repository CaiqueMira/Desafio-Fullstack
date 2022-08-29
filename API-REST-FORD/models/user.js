const moment = require('moment')
const connection = require('../infraestructure/connection')

class User { 

    listAll(res) {
        const sql = `SELECT id, name, email, password, fullName, signupDate FROM user`

        connection.query(sql, (error, results) => {
            if(error) {
                res.status(400).send(error)
            }
            else {
                results.forEach(result => result.signupDate = moment(result.signupDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'))                                
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
                    console.log(userWithDate)
                    console.log("Registration successfully complete")
                    res.status(200).send(userWithDate)
                }
            })
        }
    }    
    
    searchById(res, id) {
        const sql = `SELECT id, name, email, password, fullName, signupDate FROM user WHERE ID = ?`
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
   
    login(res, user) {
        const sql = `SELECT id, name, email FROM user WHERE name = ? AND password = ?`                            
        connection.query(sql, [user.name, user.password], (error, results) => {
            if(error) {
                res.status(400).send(error)
            }
            else {
                console.log(...results)                  
                if(results.length > 0) {
                    console.log("Login efetuado")
                    res.status(200).send(...results)
                }
                else {
                    res.status(401).send(`Usuário ou senha incorretos`)
                }
            }
        })     
        
    }    
    
    searchForName(res, name) {
        const sql = `SELECT name FROM user WHERE name = ?`               
        connection.query(sql, name, (error, results) => {
            if(error) {                
                res.status(400).send(error)
            }
            else {                
                if(results.length > 0) {
                    res.status(200).send(...results)
                }                                                    
            }
        })
    }    
}

module.exports = new User