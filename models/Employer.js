const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise
mongoose.connection.openUri(`${process.env.APPDB}_${process.env.NODE_ENV}_db`, (err) => {
  if (err) {
    console.log(err);
  }
})

let employerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  company: String,
  location: String,
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: null
  }
})

employerSchema.pre('save', function (next) {
  // Hash inputed password here
  next()
})

employerSchema.pre('findOneAndUpdate', function(next) {
  this.updateOne({
      _id: this._conditions._id
    }, {
      updatedAt: Date.now()
    })
    .then(() => {
      next()
    })
    .catch(reason => {
      console.log(reason)
    })
})


module.exports = mongoose.model('Other', employerSchema)