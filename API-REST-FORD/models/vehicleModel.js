const connection = require('../infraestructure/connection')

class VehicleModels {    
    listAll(res) {
        const sql = 'SELECT id, model, totalVolume, connected, softwareUpdates FROM vehicle_models'
        connection.query(sql, (error, results) => {
            if(error) {
                res.status(400).send(error)
            }
            else {                
                res.status(200).send({vehicles: results})
            }
        })
    }

    add(res, vehicleModel) {
        const sql = `INSERT INTO vehicle_models SET ?`        
        
        connection.query(sql, vehicleModel, (error, results) => {
            if(error) {
                res.status(400).send(error)
            }
            else {
                res.status(200).send(vehicleModel)
            }
        })
    }

    searchById(res, id) {
        const sql = `SELECT id, model, totalVolume, connected, softwareUpdates FROM vehicle_models WHERE id = ?`        

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
        const sql = `UPDATE vehicle_models SET ? WHERE id = ?`
        
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
        const sql = `DELETE FROM vehicle_models WHERE id = ? `
        connection.query(sql, id, (error, results) => {
            if(error) {
                res.status(400).send(error)
            }
            else {
                res.status(200).send({id})
            }
        })
    }
}

module.exports = new VehicleModels