const User = require('../models/User')
const Article = require('../models/Article')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_Secret

//user registration

const register = async(req, res)=>{
    const {username, email, password} = req.body;
    

    try{
        //check email already exists or not
        const emailAlreadyExists = await User.findOne({email})

        if(emailAlreadyExists)
           return res.status(400).json( {error:"Email Already Exists"} )

        const usernameAlreadyExists = await User.findOne({username})

        // check username already in use or not
        if(usernameAlreadyExists)
            return res.status(400).json({error:"Username already in use. Please choose a different username"})

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, email, password : hashedPassword})

        res.status(201).json({message:"user registered successfully"});

    }
    catch(err)
    {
      res.status(500).json({ error: 'User registration failed'});
    }
}


const login = async(req, res)=>{
    const {email, password} = req.body
    if(!email || !password)
        return res.status(400).json({error: 'please provide email and passwod'})

    try{
        
        const user = await User.findOne({email})
        if(!user)
           return  res.status(400).json({error: 'invalid email!'})
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        
        if (!isPasswordCorrect) 
            return res.status(400).json({ error: 'Invalid email or password' });
        

        // generate jwt token

        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
       return  res.status(200).json({ token });

    }
    catch(err)
    {
      return res.status(500).json( { error: 'Login failed'} );
    }
}


const getProfile = async(req, res)=>{
    
    
    try{
    const user = await User.findOne({_id:req.user.userId})
    if(!user)
        res.status( 400 ).json({ error: 'user not found' })
    

     // Fetch all articles authored by the user
    const articles = await Article.find({ userId: req.user.userId });
    console.log( articles )
    
    // Return the user profile along with their articles
    return res.status(200).json({
      user,
      articles
    });
}
    catch( err )
    {
    res.status(500).json({ error: 'something went wrong'})
    }
}


module.exports = { login, register, getProfile }