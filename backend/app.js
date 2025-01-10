import express from 'express'
import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import { v4 as uuidv4 } from 'uuid'
import 'dotenv/config'

import { generateRandomCode, sendmyMail } from './lib/mail.mjs'



const prisma = new PrismaClient()
const app = express()
const codes = {} // liste des paires "email: code"

app.set('view engine', 'ejs')

////////////////////////// MIDDLEWARES ///////////////////////////////////////////////
app.use('/assets', express.static('./assets'))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


//////////////////////////////// CRÉATION DE COMPTE //////////////////////////////////////////////////////////
/**app.get('/register', function (req, res) {
    res.render('register', {
        errorMessage: ""
    })
})
*/

//////////////////////////////// PAGE DE LOGIN //////////////////////////////////////
/**app.get('/login', function (req, res) {
    res.render('login', {
        errorMessage: ""
    })
})
*/

/** 
app.post('/auth/created_account', async (req, res) => {
    const {email, password, passwordOk} = req.body
    const saltRounds = 3;
    const hash = await bcrypt.hash(password, saltRounds)
    if (passwordOk === password) {
        let user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        console.log('existingUser', user)
        if (user) {
            res.render('register', {
                errorMessage: `Cet email est déjà utilisé' : ${email}`,
            })
        } else {
            user = await prisma.user.create ({
                data: {email, password: hash}
            })

            res.redirect('/validation')
        }
        
    } else {
        res.render('register', {
            errorMessage: "Les deux mots de passe sont différents"},
        )
    }

})
*/

/** 
app.get('/validation', (req, res) => {
    res.render('validation')
})
*/

///////////////////////// Partie sécurisée //////////////////////////////////////

app.post('/auth/connexion', async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email }
        })  
    if (user) {
        const match = bcrypt.compare(password, user.password);
        if (match) {
            const code_test = generateRandomCode(4)
            codes[email] = code_test
            await sendmyMail({
                from: 'buisson@enseeiht.fr',
                to: email,
                subject: 'code vérification', 
                text: `Votre code de vérification : ${code_test}`,
            })
            
            res.cookie('code_verif', "123", { httpOnly: true, maxAge: 30 * 60 * 1000 })
            res.sendStatus(200);
        } else {
            res.sendStatus(403)
        }
    } else {
        res.sendStatus(403)
    }
})



app.post('/auth/verif-code', async (req, res) => {
    const {email, code} = req.body
    
    if (codes[email] === code) {
        const cookie = req.cookies['code_verif']
        if (cookie !== '123'){
            res.render('login', {errorMessage: "Code expiré"})
        } else {
            const user = await prisma.user.findUnique({
                where: {email: email}
            })
            let session_uuid = uuidv4()
            const session = await prisma.session.create({
                data: {
                    session_id: session_uuid,
                    user_id: user.id,
                }
            })
            res.cookie('session_id', session.session_id, {httpOnly: true, maxAge: 60 * 60 * 1000})
            res.redirect('/visite')
        }
    } else {
        res.render('verif_code', {email, errorMessage: "Code invalide"})
    }
})


app.use('/', async (req, res, next) => {
    if (req.cookies.session_id) {
        next()
    } else {
        res.render('login', {errorMessage: "Session expirée"})
    }
})

/** 
app.get('/visite', async function (req, res) {
    const current_session = req.cookies.session_id
    const authenticated_user = await prisma.user.findFirst({
        where: {session: {some: {session_id: current_session}}}
    })
    const visits = await prisma.visit.findMany({
        include: {company : true}
    })
    res.render('visite', {
        user: authenticated_user,
        visits: visits, 
        errorMessage: ""})
})
*/


/**app.get('/new-visite', async (req, res) => {
    const current_session = req.cookies.session_id
    const authenticated_user = await prisma.user.findFirst({
        where: {session: {some: {session_id: current_session}}}
    })

    const companies = await prisma.company.findMany()
    const visits = await prisma.visit.findMany({
        include: {company : true}
    })

    res.render('new-visite', {
        user: authenticated_user,
        companies : companies, 
        errorMessage: ""})
})
*/

app.post('/register-visit', async (req, res) => {
    const {date, company, report} = req.body
    
    const companyId = parseInt(req.body.company_id,10);
    const current_session = req.cookies.session_id;

    const authenticated_user = await prisma.user.findFirst({
        where: {session: {some: {session_id: current_session}}}
    })

    const new_visit = await prisma.visit.create ({
        data: {
            date: new Date (date),
            company: { connect: { id: companyId} },
            report: report || "",
            user: { connect: { id: authenticated_user.id}}
        }
    })
    const visits = await prisma.visit.findMany({
        include: {company : true }
    });
    res.redirect('/visite')
})



const PORT = process.env.PORT || 3000
app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`)
})
