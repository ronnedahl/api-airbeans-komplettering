import Joi from 'joi'

const userSchema = Joi.object({
   username: Joi.string().alphanum().min(5).max(30).required(),
   password : Joi.string().min(5).required()
    
})

export default userSchema  // Denna behövdes ej för min uppgift, men
                           // låter den vara med för att visa att 
                           // jag förstår tanken med Joi.
                           // Här kan man ange vad man vill validera
                           // skulle jag vilja validera tex email lägger
                           // man bara til den i Joi.object