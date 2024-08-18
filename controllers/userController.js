//logic to resolve register request

const users = require("../modal/userSchema");
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    console.log('inside register controller');
    const { username, email, password } = req.body

    console.log(username, email, password);

    try {
        const existingUser = await users.findOne({ mailId: email })

        if (existingUser) {
            res.status(406).json('Account already exists')
        } else {
            //object for the model

            const newUser = new users({
                username,
                mailId: email,
                password,
                github: "",
                linkedIn: "",
                profile: ""
            })

            //to save the data in the mongodb
            await newUser.save()

            //response
            res.status(200).json(newUser)
        }

    } catch (error) {
        res.status(401).json(error)
    }
}

//login controller
exports.login = async (req, res) => {
    console.log('inside login function');
    const { email, password } = req.body
    console.log(email, password);

    try {
        const existingUser = await users.findOne({ mailId: email, password })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, 'supersecretkey')
            res.status(200).json({
                existingUser,
                token
            })

        }
        else {
            res.status(401).json('Invalid Email or Password')
        }

    } catch (error) {
        res.status(401).json(`request failed due to ${error}`)
    }
}

  
//profile update
exports.updateProfileController = async(req,res)=>{
     const userId = req.payload

     const {username,email,password,github,linkedin,profile} = req.body

     profileImage = req.file?req.file.filename:profile
     console.log(profileImage);
     

     try{
       
        const existingUsers = await users.findByIdAndUpdate({_id:userId},{username,mailId:email,password,github,linkedIn:linkedin,profile:profileImage},{new:true})

        
        await existingUsers.save()
       
        
        res.status(200).json(existingUsers)

     }catch (error){
        res.status(401).json(`requested failed due to ${error} `)
     }
}
