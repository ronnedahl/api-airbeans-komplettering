
let cart = []  // här lägger min tillfälliga beställning i min varukorg

const users = [{ id: 1, name: 'Peter', password: 'peter' },// för att få min simulerade inlogg
                                                           // att fungera.
{ id: 2, name: 'Stina', password: 'stina' },
{ id: 3, name: 'Jesper', password: 'jesper' }

]
export { cart, users }  // exporterar mina cart och users som sedan
                        // kan importeras där de behövs.