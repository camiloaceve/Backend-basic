const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    console.log('Bases de datos conectada')
  } catch (error) {
    console.log(err)
    throw new Error('Error al conectar a la Bd')
  }
}

module.exports = {
  dbConnection
}
