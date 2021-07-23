const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRoleValido = async (rol = '') => {
  const existRol = await Role.findOne({ rol })
  if (!existRol) {
    throw new Error(`El rol ${rol} no esta en la DB`)
  }
}

const emailExist = async (email = '') => {
  const validEmail = await Usuario.findOne({ email })
  if (validEmail) {
    throw new Error(`El correo: ${email}, ya existe`)
  }
}

const existUserId = async id => {
  const existUser = await Usuario.findById(id)
  if (!existUser) {
    throw new Error(`El id: ${id}, no existe`)
  }
}

module.exports = {
  esRoleValido,
  emailExist,
  existUserId
}
