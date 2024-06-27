import nedb from 'nedb-promises'
import { cart } from '../config/data.js'
import { nanoid } from 'nanoid'
const menudb = new nedb({ filename: 'menus.db', autoload: true })
const ordersdb = new nedb({ filename: 'orders.db', autoload: true })

async function getMenu() {

    try {
        const findMenu = await menudb.find({})
        return findMenu
    } catch (error) {
        console.log(error)
    }
}

async function addToCart(_id) {

    try {
        console.log(_id)
        const findId = await menudb.findOne({ _id: _id })

        if (findId) {

            cart.push(findId)  // När _id har hittats i databasen
            return cart     // pushas den upp till cart som ligger i config/data.js
        } else {
            return false

        }
    } catch (error) {
        console.log(error)
        return false

    }

}

function getCart() {
    try {
        return cart
    } catch (error) {
        console.log(error)
    }
}

async function getOrder() {
    try {
        const findOrder = await ordersdb.find({})
        return findOrder // ordern returneras om den hittas
                         // annars loggas ett fel.
    } catch (error) {
        console.log(error)
    }
}

async function confirmOrder(cart) {

    try {
        const userID = nanoid(10)
        const order = { userID, cart } // för att få med UserID tillsammans med cart skapar jag objektet order

        const orderInsert = await ordersdb.insert(order) // cart tillsammans med userId läggs till i ordern

        return { order: orderInsert }
    } catch (error) {
        console.error(error)
        throw new Error('Cant confirm your order')

    }

}

function clearCart() {
    let cart = [] // cart nollställs
    console.log(`Nu är cart tömd ${cart}`)
    return cart
}

export { getMenu, addToCart, confirmOrder, getCart, clearCart, getOrder }