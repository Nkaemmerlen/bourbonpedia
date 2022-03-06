import { Bourbon } from "../models/bourbon.js"

function newBourbon(req, res) {
  res.render('bourbons/new', {
    title: 'Add Bourbon',
  })
}

// function create(req, res) {
//   const bourbon = new Bourbon(req.body)
//   bourbon.save(function(err) {
//     if (err) return res.redirect('bourbons/new')
//     res.redirect('/bourbons')
//   })
// }

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



export {
  newBourbon as new,
  create,
  index
}