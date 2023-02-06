const express = require('express')
const logger = require('morgan')
const cors = require('cors')

require("dotenv").config()

const sgMail = require("@sendgrid/mail")
const { SENDGRID_API_KEY } = process.env

sgMail.setApiKey(SENDGRID_API_KEY);

const email = {
  to: "kehaj70378@chotunai.com",
  from: "valmas1997@gmail.com",
  subject: "New",
  html: "<p>New</p>"
}
 
sgMail.send(email)
  .then(() => { console.log("Email success") })
  .catch(error => { console.log(error.message) })


const authRouter = require('./routes/api/auth')
const usersRouter = require('./routes/api/users')
const contactsRouter = require('./routes/api/contacts')

const app = express()



const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use("/api/auth", authRouter)
app.use("/api/users", usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message })
})

module.exports = app
