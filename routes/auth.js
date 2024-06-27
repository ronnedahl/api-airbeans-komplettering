import { Router } from 'express'
import { getMenu, addToCart, confirmOrder, getCart, clearCart, getOrder } from '../services/auth.js'
import { checkLoggedIn } from '../middlewares/auth.js'
import {cart} from '../config/data.js'

// import{ validate} from '../middlewares/validate.js'
const router = Router()

// show the menu

router.post('/', async (req, res) => {
    const menu = await getMenu()

    res.json({ showMenu: menu })
})

// Add menu item to cart
router.post('/cart/:_id', checkLoggedIn, async (req, res) => {
    try {
        const _id = req.params._id
        const addCart = await addToCart(_id) // anropar addToCart funktionen och skickar med
        //_id som parameter och som nu innehåller req.params.id
        // vars värde fårs från insomnia inmatningen,

        if (addCart) {   // om addCart är true och vi lyckats att pusha till cart
            res.json({   // går vi till ett possitivt meddelande samt visar i ett objekt ett meddelande 
                // och innehållet i cart
                message: "Menu item added successfully", //objektet visar innehållet i cart
                //efter lyckad tillagt kaffe
                incart: addCart
            })
        } else {
            res.status(401).json({ message: "item not found" })
        }


    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})
// show cart
router.get('/cart', checkLoggedIn, (req, res) => { //kör middleware funktionen och kollar om jag är inloggad eller ej
    // cart visas i responsen i jsnon objektet.
    const cartShow = cart
    res.json({ totalinCart: cartShow })
})
 // show order
router.get('/',checkLoggedIn,async(req, res)=>{
const order = await getOrder()
res.json({showOrder: order})
})

router.post('/confirm', checkLoggedIn, async (req, res) => {
    try {
        const cart = getCart()
        console.log(`Cart content before confirmation: ${JSON.stringify(cart)}`)
        //Här körde jag en log för att kontrollera hur cart såg ut innan den läggs till
        // confirmOrder då jag fått ett extra _id pga databasen gör tydligen detta vid en insert.
        if (!cart || cart.length === 0) {

            return res.status(401).json({ message: "The cart is empty" })
        }
        const orderDetails = await confirmOrder(cart) // carten läggs här in i databasen
        clearCart() // funktionen anropas för att tömma cart efer att 
        // ordern har blivit confirmed

        res.json({
            orderDetails: orderDetails.order // i objektet orderDetails skrivs ordern ut i det här fallet insomnia

        })

    } catch (error) {
        return res.status(500).json({ message: "something went wrong!" })
    }

})

export default router