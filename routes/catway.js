const  express = require('express')
const router = express.Router()
const Catway = require('../models/catway')

// tous les catways
router.get('/', async (req, res) => {
    try{
        const catways = await Catway.find()
        res.json(catways)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})
// un catway specifique
router.get('/:id', getCatways, (req, res) => {
    res.json(res.catway)
})
//créer un catway
router.post('/', async (req, res) => {
    const catway = new Catway({
        catwayNumber: req.body.catwayNumber,
        type: req.body.type,
        catwayState: req.body.catwayState
    })

    try{
const newCatway = await catway.save()
res.status(201).json(newCatway)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    })
//modifier un catway
router.patch('/:id', getCatways, async (req, res) => {
    if (req.body.catwayNumber != null) {
        res.catway.catwayNumber = req.body.catwayNumber
    }
    if (req.body.type != null) {
        res.catway.type = req.body.type
    }
    if (req.body.catwayState != null) {
        res.catway.catwayState = req.body.catwayState
    }
    try {
        const updatedCatway = await res.catway.save()
        res.json(updatedCatway)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
    })
//supprimer un catway
router.delete('/:id', getCatways, async (req, res) => {
    try{
        await Catway.deleteOne({ _id: res.catway._id });
        res.json({ message: 'catway supprimé'})
       } catch (err) {
        res.status(500).json({ message: err.message})
       }
    
})

async function getCatways(req, res, next) {
    let catway
try{
catway = await Catway.findById(req.params.id)
if (catway == null){
    return res.status(404).json({ message: 'Ce catway n\'existe pas'})
}
} catch(err){
return res.status(500).json({message: err.message})
}

res.catway = catway
next()
}

module.exports = router