const  express = require('express')
const router = express.Router()
const Users = require('../models/users')

// tous les utilisateurs
router.get('/', async (req, res) => {
    try{
        const users = await Users.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// un utilisateur specifique
router.get('/:id', getUsers, (req, res) => {
    res.json(res.user)
})
//créer un utilisateur
router.post('/', async (req, res) => {
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try{
const newUser = await user.save()
res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    })
//modifier un utilisateur
router.patch('/:id', getUsers, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
    })
//supprimer un utilisateur
router.delete('/:id', getUsers, async (req, res) => {
   try{
    await Users.deleteOne({ _id: res.user._id });
    res.json({ message: 'utilisateur supprimé'})
   } catch (err) {
    res.status(500).json({ message: err.message})
   }
})

 async function getUsers(req, res, next) {
    let user
try{
user = await Users.findById(req.params.id)
if (user == null){
    return res.status(404).json({ message: 'Cet utilisateur n\'existe pas'})
}
} catch(err){
return res.status(500).json({message: err.message})
}

res.user = user
next()
}


module.exports = router