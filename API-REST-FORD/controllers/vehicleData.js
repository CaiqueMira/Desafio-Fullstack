const vehicleData = require('../models/vehicleData')

module.exports = app => {
    app.get('/vehicleData', (req, res) => {
        vehicleData.listAll(res)
    })

    app.post('/vehicleData', (req, res) => {
        const values = req.body

        vehicleData.add(res, values)
    })    

    app.get('/vehicleData/:id', (req, res) => {
        const id = parseInt(req.params.id)             

        vehicleData.searchById(res, id)
    })

    app.patch('/vehicleData/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body        

        vehicleData.alterById(res, id, values)
    })

    app.delete('/vehicleData/:id', (req, res) => {
        const id = parseInt(req.params.id)

        vehicleData.deleteById(res, id)
    })

    app.get('/vehicleDataVin/:vin', (req, res) => {
        const params = req.params.vin               
        vehicleData.getDataFiltered(res, params)
    })

    
}