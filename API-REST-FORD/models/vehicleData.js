const connection = require('../infraestructure/connection')

class VehiclesData {
    listAll(res) {
        const sql = `SELECT * FROM vehicles_data`

        connection.query(sql, (error, results) => {
            if(error) {
                res.status(400).send(error)
            }
            else {
                res.status(200).send(results)
            }
        })
    }

    add(res, vehicleData) {
        
        vehicleData.vin = vehicleData.vin.toUpperCase()
        
        const VINCodeIsValid = vehicleData.vin.length == 20      
        
        const validations = [
            {
                name: 'VIN',
                valid: VINCodeIsValid,
                menssage: 'The VIN code must be 20 characters long'
            }            
        ]
        
        const errors = validations.filter(validation => !validation.valid)
        if(errors.length > 0) {
            res.status(400).send(errors)
        }
        else {            
            const sql = `INSERT INTO vehicles_data SET ?`
            connection.query(sql, vehicleData, (error, results) => {
                if(error) {
                    res.status(400).send(error)
                }
                else {
                    res.status(200).send({vehicleData})
                }
            })
        }
    }

    searchById(res, id) {
        const sql = `SELECT * FROM vehicles_data WHERE ID = ?`

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
        const sql = `UPDATE vehicles_data SET ? WHERE ID = ?`
        
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
        const sql = `DELETE FROM vehicles_data WHERE ID = ? `
        connection.query(sql, id, (error, results) => {
            if(error) {
                res.status(400).send(error)
            }
            else {
                res.status(200).send({id})
            }
        })
    }

    getDataFiltered(res, value) { 
        value = value.toUpperCase()            
        const sql = `SELECT * FROM vehicles_data`

        connection.query(sql, value, (error, results) => {
            if(error) {
                res.status(400).send(error)
            }
            else { 
                console.log(results)             
                                              
                results = results.filter((obj) =>           
                    obj.vin.slice(0, value.length) === value                                      
                )
                console.log(results)               
                
                res.status(200).send({vehicleData: results})
            }
        })
    }
}

module.exports = new VehiclesData