const { Router } = require('express')
const { check } = require('express-validator')
/* const Role = require('../models/role') */

const { validarCampos } = require('../middlewares/validar-campos')
const {
  esRoleValido,
  emailExist,
  existUserId
} = require('../helpers/db-validators')

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch
} = require('../controllers/usuarios')

const router = Router()

router.get('/', usuariosGet)

router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserId),
    check('rol').custom(esRoleValido),
    validarCampos
  ],
  usuariosPut
)

router.post(
  '/',
  [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('password', 'debe tener minimo 6 caracteres').isLength({ min: 6 }),
    check('email', 'No es un correo valido').isEmail(),
    check('email').custom(emailExist),
    /* check('rol', 'no es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']), */
    check('rol').custom(esRoleValido),
    validarCampos
  ],
  usuariosPost
)

router.delete(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserId),
    validarCampos
  ],
  usuariosDelete
)

router.patch('/', usuariosPatch)

module.exports = router
