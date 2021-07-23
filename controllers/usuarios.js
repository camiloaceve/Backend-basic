const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query
  const query = { status: true }
  /*  const Usuarios = await Usuario.find(query) */
  /*  .skip(Number(desde))
    .limit(Number(limite)) */

  /* const total = await Usuario.count(query) */

  const [total, usuarios] = await Promise.all([
    await Usuario.count(query),
    await Usuario.find(query)
  ])

  res.json({
    total,
    usuarios
  })
}

const usuariosPost = async (req, res = response) => {
  const { name, email, password, rol } = req.body
  const usuario = new Usuario({ name, email, password, rol })

  // encrypt password
  const salt = bcrypt.genSaltSync()
  usuario.password = bcrypt.hashSync(password, salt)

  // save user
  await usuario.save()

  res.json({
    usuario
  })
}

const usuariosPut = async (req, res = response) => {
  const { id } = req.params

  const { _id, password, google, email, ...resto } = req.body

  if (password) {
    // encrypt password
    const salt = bcrypt.genSaltSync()
    resto.password = bcrypt.hashSync(password, salt)
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto)

  res.json(usuario)
}

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - usuariosPatch'
  })
}

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params

  const usuario = await Usuario.findByIdAndUpdate(id, { status: false })

  res.json({
    usuario
  })
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}
