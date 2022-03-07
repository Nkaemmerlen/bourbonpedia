import { Bourbon } from "../models/bourbon.js"

function newBourbon(req, res) {
  res.render('bourbons/new', {
    title: 'Add Bourbon',
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Bourbon.create(req.body)
  .then(bourbon => {
    res.redirect('/bourbons')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/bourbons/new')
  })
}

function index(req, res) {
  Bourbon.find({}, function(err, bourbons) {
    res.render('bourbons/index', {
      bourbons,
      err,
      title: 'All Bourbons'
    })
  })
}

function show(req, res) {
  Bourbon.findById(req.params.id)
  .populate('owner')
  .then(bourbon => {
    res.render('bourbons/show', {
      bourbon,
      title: 'Details'
    })
  })
}

function createReview(req, res) {
  Bourbon.findById(req.params.id)
  .then(bourbon => {
    bourbon.reviews.push(req.body)
    bourbon.save()
    res.redirect(`/bourbons/${bourbon._id}`)
  })
  .catch(err => {
    console.log(err)
  })
}


export {
  newBourbon as new,
  create,
  index,
  show,
  createReview
}