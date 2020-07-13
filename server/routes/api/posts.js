const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');

// Get all data from data
router.get('/', async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
})

//  Post data to database

router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        date: new Date()
    })
    return res.status(201).send();
})

// Delete post from database


router.delete('/:id', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({
        _id: new mongodb.ObjectId(req.params.id)
    })
    return res.status(200).send();
})


async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://juan:123@cluster0.npqqt.mongodb.net/vuejs-stack?retryWrites=true&w=majority', {
        useNewUrlParser: true, useUnifiedTopology: true,
    });
    return client.db('vuejs-stack').collection('posts');
}


module.exports = router