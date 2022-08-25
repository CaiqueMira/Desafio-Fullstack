const vehicleModel = require('../models/vehicleModel')

module.exports = app => {
    app.get('/vehicleModel', (req, res) => {
        vehicleModel.listAll(res)        
    })
    
    app.post('/vehicleModel', (req, res) => {
        const values = req.body

        vehicleModel.add(res, values)
    })

    app.get('/vehicleModel/:id', (req, res) => {
        const id = parseInt(req.params.id)        

        vehicleModel.searchById(res, id)
    })

    app.patch('/vehicleModel/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body

        vehicleModel.alterById(res, id, values)
    })
    
    app.delete('/vehicleModel/:id', (req, res) => {
        const id = parseInt(req.params.id)

        vehicleModel.deleteById(res, id)
    })

}