
const router = require('express').Router()
const { response } = require('express')
const path = require('path')
const root = path.join(__dirname, '..', '..', 'public')

const recipes = require('../../../data/recipes.json')
router.get ('/', (request, response) => {
    //const { id, title, image, prepTime, difficulty } = request.params
    const found = recipes.map(({id, title, image, prepTime, difficulty}) => {
        return {id, title, image, prepTime, difficulty}
    })
    response.json(found)
})

router.get ('/recipe/:id', (request, response) => {
    const { id } = request.params
    const recipe = recipes.find(r => r.id === Number(id))
    //const found = recipes.find(r => r.id.toString()=== id)
    if (recipe) {
        return response.json(recipe)}

    else {
        response.send({error: {message: `could not find recipe with id: ${id}`}})}
})

router.post ('/recipe/add', (request, response) => {
    const { title, image, ingredients, discription, instructions, prepTime, difficulty } = request.body
    const newId = recipes.length ? recipes[recipes.length - 1].id + 1 : 1
    const newRecipe = {
        id:newId, title, image, ingredients, instructions, prepTime, difficulty
    }
    recipes.push(newRecipe)
    return response.json({
        message: "Recipe added",
        recipe: newRecipe
    })
})
//router.get ('/api/v1/random', (request, response) => {
    
//})
router.get('/', (_, response) => response.sendFile('index.htm', { root }))

module.exports = router