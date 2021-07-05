import app from './src/app'
import {sequelize} from './src/db'

sequelize
.sync({force:true, logging:false})
.then(() => {

    console.log("Hola")
    console.log('db connected')
    app.listen(3001, () => {
        console.log('app listening on port 3001')
    })

})
.catch(err => {
    console.log(err)
})
