import express from 'express'
import * as controller from '../controllers/usersController.js'
import auth from '../middlewares/auth.js'
import 'express-async-errors'
import * as validations from '../lib/userValidation.js'
import processFile from '../middlewares/processFile.js'

const app = express.Router()

app.get('/', auth, controller.getUser)
app.post('/register', ...validations.register,  controller.createUser)
app.post('/login', ...validations.login, controller.login)
app.get('/logout', auth, controller.logout)
app.post('/upload', processFile.single('avatar'), controller.upload)
export default app