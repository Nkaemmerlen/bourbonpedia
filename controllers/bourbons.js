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
    .then(()=>{
      res.redirect(`/bourbons/${bourbon._id}`)
    })
  })
  .catch(err => {
    console.log(err)
  })
}

function createPrice(req, res) {
  Bourbon.findById(req.params.id)
  .then(bourbon => {
    bourbon.prices.push(req.body)
    bourbon.save()
    .then(()=>{
      res.redirect(`/bourbons/${bourbon._id}`)
    })
  })
  .catch(err => {
    console.log(err)
  })
}
function deleteBourbon(req, res) {
  Bourbon.findById(req.params.id)
  .then(bourbon => {
    if(bourbon.owner.equals(req.user.profile._id)) {
      bourbon.delete()
      .then(() => {
        res.redirect('/bourbons')
      })
    } else {
      throw new Error ('NOT AUTHORIZED')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/bourbons')
  })
}
function edit(req, res) {
  Bourbon.findById(req.params.id)
  .then(bourbon => {
    res.render('bourbons/edit', {
      bourbon,
      title: 'Edit bourbon'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/bourbons')
  })
}

function update(req, res) {
  Bourbon.findById(req.params.id)
  .then(bourbon => {
    if (bourbon.owner.equals(req.user.profile._id)) {
      bourbon.updateOne(req.body, {new: true})
      .then(()=> {
        res.redirect(`/bourbons/${bourbon._id}`)
      })
    } else {
      throw new Error ('NOT AUTHORIZED')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/bourbons')
  })
}


export {
  newBourbon as new,
  create,
  index,
  show,
  createReview,
  deleteBourbon as delete,
  edit,
  update,
  createPrice
}