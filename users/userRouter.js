const express = require('express');
const db = require('./userDb');

const router = express.Router();



router.use(express.json());



router.post('/', validateUser, async (req, res) => {
    console.log(req.body) 
    console.log(req.body.name)  
    try{
        const {body} = req;
        const newUser = await db.insert(body);
        res.status(201).json(newUser)
    }catch(error){res.status(500).json({message: "Could not create user", error})}    

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', async (req, res) => {
    try{
        const users = await db.get();
        res.status(200).json(users)
    }catch(error){console.log(error)}
});

router.get('/:id', validateUserId, async (req, res) => {
    const {id} = req.params
    console.log(id)
    try{
        const user = await db.getById(id)
        res.status(200).json(user)
        
    }catch(err){res.status(400).json({message: "invalid user id"})}

});

router.get('/:id/posts', validateUserId, async (req, res) => {
    const {id} = req.params
    console.log(id)
    try{
        const posts = await db.getUserPosts(id)
        res.status(200).json(posts)
        
    }catch(err){res.status(400).json({message: "invalid user id"})}


});

router.delete('/:id', validateUserId, async (req, res) => {
    const {id} = req.params
    console.log(id)
    try{
        const user = await db.remove(id)
        res.status(200).json(user)
        
    }catch(err){res.status(400).json({message: "invalid user id"})}

});

router.put('/:id', validateUserId, async (req, res) => {
    const {id} = req.params;
    const {body} = req
    //console.log(id, changes)
    try{
        const update = await db.update(id, body)
        res.status(200).json(update)
        
    }catch(err){res.status(400).json({message: "invalid user id"})}

});

//custom middleware



function validateUserId(req, res, next) {
    const id = req.params;
    try{
       if(db.getById(id))
        next();
    }catch(err){res.status(400).json({message: "invalid user id"})}
};

function validateUser(req, res, next) {
    console.log('hi')
    if(req.body){       
        next();
    }else{res.status(400).json({ message: "missing user data" })};
    
};

function validatePost(req, res, next) {
    if(req.body){
        const body = req.body;
        if(body.text){
           next();
        }
        else{next({ message: "missing required text field" })}
    }
    else{res.status(400).json({ message: "missing post data" })}
};

module.exports = router;
