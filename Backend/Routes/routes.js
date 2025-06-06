const express = require('express')
const routes = express()

const mongose = require('mongoose')
const countires = require('../Modules/countries')
const user = require('../Modules/user')
const Survey = require('../Modules/servay')

routes.get('/', async (req, res) => {
    try {
        const countries = await countires.find({}).sort({ TotalScore: -1 });
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch countries' });
    }
})

routes.get('/:id', async (req, res) => {
    const { id } = req.params;  
    if (!mongose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such country found' });
    }
    try {
        const country = await countires.findById(id);
        if (!country) {
            return res.status(404).json({ error: 'No such country found or exists' });
        }
        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch country' });
    }
})
routes.post('/', async (req, res) => {
    const { CountryName, TotalUser, TotalScore, Healthcare, Education, Employment, Transportation, PublicSafety } = req.body;

    const country = new countires({
        CountryName,
        TotalUser,
        TotalScore,
        Healthcare,
        Education,
        Employment,
        Transportation,
        PublicSafety
    });

    try {
        await country.save();
        res.status(201).json({ country });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})
routes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such country found' });
    }

    try {
        const country = await countires.findByIdAndDelete({ _id: id });
        if (!country) {
            return res.status(404).json({ error: 'No such country found or exists' });
        }
        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete country' });
    }
})
routes.put('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such country found' });
    }

    const { CountryName, TotalUser, TotalScore, Healthcare, Education, Employment, Transportation, PublicSafety } = req.body;

    try {
        const country = await countires.findByIdAndUpdate(id, {
            CountryName,
            TotalUser,
            TotalScore,
            Healthcare,
            Education,
            Employment,
            Transportation,
            PublicSafety
        }, { new: true });

        if (!country) {
            return res.status(404).json({ error: 'No such country found or exists' });
        }
        res.status(200).json(country);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

routes.post('/singup', async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await user.find({ email });
    if (existingUser.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
    }
    const newUser = new user({
        username,
        email,
        password
    });
    try {
        await newUser.save();
        res.status(201).json({ user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// storing the servey data of individual user
routes.post('/survey', async (req, res) => {
    const { userId, country, scores, totalScore } = req.body;
    const survey = new Survey({
        userId,
        country,
        scores,
        totalScore
    });
    try {
        await survey.save();
        res.status(201).json({ survey });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})



module.exports = routes ;

