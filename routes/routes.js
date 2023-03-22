import express from 'express'
import database from '../database/config.js'

const router = express.Router()

router.get('/', (req, res) => {
    let query = 'select * from users order by created_at desc'

    database.query(query, (error, results, fields) => {
        if (error) {
            throw error
        } else {
            res.render('list.ejs', {data: results})
        }
    })
})

router.get('/add', (req, res) => {
    res.render('add.ejs', {error: ''})
})

router.post('/add_user_data', (req, res) => {
    const {first_name, last_name, age, gender} = req.body

    let query = `insert into users(first_name, last_name, age, gender) values('${first_name}', '${last_name}', ${age}, '${gender}')`

    database.query(query, (error, results, fields) => {
        if(error) {
            res.render('add.ejs', {error: `Error: ${error.message}`})
            // throw error
        } else {
            res.redirect('/html_node')
        }
    })
})

router.get('/edit/:id', (req, res) => {
    const id = req.params.id
    let query = `select * from users where id = ${id}`

    database.query(query, (error, results, fields) => {
        if (error) {
            throw error
        } else {
            res.render('edit.ejs', {error: '', data: results[0]})
        }
    })
})

router.post('/edit/:id', (req, res) => {
    const id = req.params.id
    let query = `
    update users set
        first_name = '${req.body.first_name}',
        last_name = '${req.body.last_name}',
        age = ${req.body.age},
        gender = '${req.body.gender}'
    where id = ${id}`

    database.query(query, (error, results, fields) => {
        if (error) {
            throw error
        } else {
            res.redirect('/html_node')
        }
    })
})

router.get('/delete/:id', (req, res)  => {
    const id = req.params.id
    let query = `delete from users where id = ${id}`

    database.query(query, (error, results, fields) => {
        if (error) {
            throw error
        } else {
            res.redirect('/html_node')
        }
    })
})

export default router