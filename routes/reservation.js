const  express = require('express')
const router = express.Router()
const Reservation = require('../models/reservation')

// toutes les reservations
router.get('/', async (req, res) => {
    try{
        const reservations = await Reservation.find()
        res.json(reservations)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})
// une reservation specifique
router.get('/:id', getReservation, (req, res) => {
    res.json(res.reservation)
})
//créer une reservation
router.post('/', async (req, res) => {
    const reservation = new Reservation({
        catwayNumber: req.body.catwayNumber,
        clientName: req.body.clientName,
        boatName: req.body.boatName,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut
    })

    try{
const newReservation = await reservation.save()
res.status(201).json(newReservation)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    })
//modifier une reservation
router.patch('/:id', getReservation, async (req, res) => {
    if (req.body.catwayNumber != null) {
        res.reservation.catwayNumber = req.body.catwayNumber
    }
    if (req.body.clientName != null) {
        res.reservation.clientName = req.body.clientName
    }
    if (req.body.boatName != null) {
        res.reservation.boatName = req.body.boatName
    }
    if (req.body.checkIn != null) {
        res.reservation.checkIn = req.body.checkIn
    }
    if (req.body.catwayState != null) {
        res.reservation.checkOut = req.body.checkOut
    }
    try {
        const updatedReservation = await res.reservation.save()
        res.json(updatedReservation)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
    })
//supprimer une reservation
router.delete('/:id', getReservation, async (req, res) => {
    try{
        await Reservation.deleteOne({ _id: res.reservation._id });
        res.json({ message: 'Réservation supprimé'})
       } catch (err) {
        res.status(500).json({ message: err.message})
       }
})

async function getReservation(req, res, next) {
    let reservation
try{
reservation = await Reservation.findById(req.params.id)
if (reservation == null){
    return res.status(404).json({ message: 'Cette réservation n\'existe pas'})
}
} catch(err){
return res.status(500).json({message: err.message})
}

res.reservation = reservation
next()
}

module.exports = router