const Article = require('../models/Article')


// Create Article (Require Auth )

const createArticle = async (req, res, next)=>{

    try{
        const {title, content} = req.body;
        const article = await Article.create({title, content, userId: req.user.userId, date: Date.now()})
        return res.status(201).json(article)
    }
    catch(error)
    {
        return res.status(500).json({message:"something went wrong"})
        
    }
}


// Get All Articles  (Public Route)

const getAllArticles = async (req, res, next) =>{
    try{
        const articles = await Article.find({})
        return res.status(201).json(articles)
    }
    catch(error)
    {
        return res.status(500).json({message:"something went wrong"})
    }
}

// Get Article by Id

const getArticle = async(req, res)=>{
    try{

        const article = await Article.findOne({_id:req.params.id}).populate('userId', 'username')
    if(!article)
      return res.status(404).json({message:'No article with id : ${req.params.id}'})
      return res.status(201).json(article)
}
    catch(error)
{
   return res.status(500).json('message : something went wrong')
   
}
}


// Update Article  (Require auth and authorization)
const updateArticle = async(req, res)=>{
    try{ 

    const {title, content} = req.body
    const article = await Article.findOne({_id:req.params.id})

    if(!article)
     return  res.status(404).json({message:'No article with id : ${req.params.id}'})
    
    if((article.userId.toString() !== req.user.userId.toString()))
      return  res.status(403).json({message: 'Not Authorised'})
    
    article.title = title;
    article.content = content;
    await article.save()
     return res.status(201).json(article)
}
    catch(error)
{
   return res.status(500).json('message : something went wrong')
}
}

// Delete Article  (Require auth and authorization)
const deleteArticle = async(req, res)=>{
    try{
    const article = await Article.findOne({_id:req.params.id})
    
    
    if(!article)
      res.status(404).json({message:'No article with id : ${req.params.id}'})
    
    if((article.userId.toString() !== req.user.userId.toString()))
        res.status(403).json({message: 'Not Authorised'})
    
    await Article.findOneAndDelete({_id:req.params.id})
      return res.status(201).json({message: "article deleted"})
}
    catch(error)
{
   return res.status(500).json('message : something went wrong')
   
}
}


module.exports = {getAllArticles, createArticle, getArticle, deleteArticle, updateArticle}