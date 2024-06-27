import userSchema from "../models/userModel.js"

const validate = (req, res, next) => {
    const { error } = userSchema.validate(req.body)

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }


}

export { validate }  // om jag hade gjort en login route och en reg route
                    // skulle jag behöva denna validering som använder sig 
                    // av joi för att bestämma vad som skall valideras.
                    // username , password, email etc.