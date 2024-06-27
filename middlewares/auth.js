function checkLoggedIn(req, res, next){

    if(global.user){  // om min globala user är true då går den 
                      // till nästa middleware. Annars felmeddelande.
        req.user = global.user
        next()
     } else {
        res.status(401).json({message: "you must be logged in"})
     }
}

export {checkLoggedIn} // exporterar min funktion som kommer att
                      //  kontrollera i min route om jag är inloggad eller inte 
                      // dvs om jag är user eller null från den globala variabeln.