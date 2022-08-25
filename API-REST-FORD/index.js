const customExpress = require('./config/customExpress')
const connection = require('./infraestructure/connection')
const database = require('./infraestructure/database')

connection.connect((error) => {
    if(error) {
        console.log(error)
    }
    else {
        console.log("Conectado com sucesso ao banco de dados")
        database.init(connection)
        const app = customExpress()
        
        app.listen(3000, () => console.log('servidor escutando na porta: 3000'))
    }
})

