import express from 'express'
import cors from 'cors'
// import nedb from 'nedb-promises' // importerad för att få menyn till db.
import menuRouter from './routes/auth.js'
import {users} from './config/data.js'//jag hämtar mina user för
                                      // simulerad inlogg 



const app = express()
const PORT = process.env.PORT || 8080
global.user = users// Här växlar jag mellan users och null för att 
//middlewares      // simulera min inloggning då jag ej har en reg route 
                   // eller login route.
app.use(express.json())
app.use(cors())

//routes

app.use('/api/menu', menuRouter)
app.use('/api/orders', menuRouter)

// const menu = [  // jag låter menyn vara kvar som jag använt att
//     {          //  registrera min menus.db med med hjälp av insert.
//       "id":1,
//       "title":"Bryggkaffe",
//       "desc":"Bryggd på månadens bönor.",
//       "price":39
//     },
//     {
//       "id":2,
//       "title":"Caffè Doppio",
//       "desc":"Bryggd på månadens bönor.",
//       "price":49
//     },
//     {
//       "id":3,
//       "title":"Cappuccino",
//       "desc":"Bryggd på månadens bönor.",
//       "price":49
//     },
//     {
//       "id":4,
//       "title":"Latte Macchiato",
//       "desc":"Bryggd på månadens bönor.",
//       "price":49
//     },
//     {
//       "id":5,
//       "title":"Kaffe Latte",
//       "desc":"Bryggd på månadens bönor.",
//       "price":54
//     },
//     {
//       "id":6,
//       "title":"Cortado",
//       "desc":"Bryggd på månadens bönor.",
//       "price":39
//     }
//   ]
// menudb.insert(menu)






app.listen(PORT, (req,res) =>{
    console.log(`server is running on PORT ${PORT}`)
})
