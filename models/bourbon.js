import mongoose from "mongoose"
const Schema = mongoose.Schema

const reviewSchema = new Schema ({
  content: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  }
})


const bourbonSchema = new Schema ({
  name: String,
  year: Number,
  price: Number,
  owner: {
    type: Schema.Types.ObjectId, 
    ref: "Profile"},
  reviews: [reviewSchema]
})

const Bourbon =  mongoose.model('Bourbon', bourbonSchema)

export {
  Bourbon
}