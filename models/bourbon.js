import mongoose from "mongoose"
const Schema = mongoose.Schema

const reviewSchema = new Schema ({
  content: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  owner: {
    type: Schema.Types.ObjectId, 
    ref: "Profile"}
})

const priceSchema = new Schema ({
  price: Number,
  area: String
})

const bourbonSchema = new Schema ({
  name: String,
  age: Number,
  bill: {
    type: String,
    enum: ['High Corn', 'High Wheat', 'High Rye'],
    default: 'High Corn'
  },
  prices: [priceSchema],
  owner: {
    type: Schema.Types.ObjectId, 
    ref: "Profile"},
  reviews: [reviewSchema]
})

const Bourbon =  mongoose.model('Bourbon', bourbonSchema)

export {
  Bourbon
}