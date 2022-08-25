const User = require('../models/user')

module.exports = app => {
    app.get('/user', (req, res) => {
        User.listAll(res)
    })

    app.get('/user/:id', (req, res) => {
        const id = parseInt(req.params.id)

        User.searchById(res, id)
    })

    app.post('/user/signup', (req, res) => {
        const user = req.body        

        User.signup(res, user)
    })

    app.patch('/user/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body

        User.alterById(res, id, values)
    })   
    
    app.delete('/user/:id', (req, res) => {
        const id = parseInt(req.params.id)
        
        User.deleteById(res, id)
    })

    app.post('/user/login', (req, res) => {
        const data = req.body 
        const header =  req.headers['x-access-token']
        console.log(header)
        

        User.login(data, res)
    })
}