const express = require('express')
const routes = express()

const mongose = require('mongoose')
const countires = require('../Modules/countries')
const profile = require('../Modules/profile')
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
// routing or adding the data in profile 
// Create profile (only if not exists)
routes.post('/profile', async (req, res) => {
    const { username, email, fullName, country, city, address, phone,password } = req.body;
    try {
        // Prevent duplicate profiles for same username or email
        const existing = await profile.findOne({ $or: [{ username }, { email }] });
        if (existing) {
            return res.status(400).json({ error: 'Profile already exists for this user.' });
        }
        const newProfile = new profile({
            username,
            email,
            fullName,
            country,
            city,
            address,
            phone,
            password
        });
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update profile by username (only allowed fields)
routes.put('/profile/username/:username', async (req, res) => {
    const { username } = req.params;
    // Only allow updating these fields
    const { fullName, country, city, address, phone } = req.body;
    try {
        const updated = await profile.findOneAndUpdate(
            { username },
            { fullName, country, city, address, phone },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ error: 'No such profile found or exists' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get profile by username
routes.get('/profile/username/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const userProfile = await profile.findOne({ username });
        if (!userProfile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(400).json({ error: "AYAZ" });//error.message
    }
});



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
            return res.status(404).json({ error: 'No such country found or exists AH ' });
        }
        res.status(200).json(country);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

routes.post('/signup', async (req, res) => {
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
        res.status(201).json({ success: true ,user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// // storing the servey data of individual user
// routes.post('/survey', async (req, res) => {
//     const { username, country, scores, totalScore } = req.body;

//     // Check if user has submitted a survey in the last 30 days
//     const oneMonthAgo = new Date();
//     oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

//     try {
//         const recentSurvey = await Survey.findOne({
//             username,
//             country,
//             createdAt: { $gte: oneMonthAgo }
//         });

//         // if (recentSurvey) {
//         //     return res.status(400).json({ error: "You can only submit the survey once every 30 days." });
//         // }

//         const survey = new Survey({
//             username,
//             country,
//             scores,
//             totalScore
//         });

//         await survey.save();
//         res.status(201).json({ survey });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });
 
// fetching data for login authentication from user  and 
// routes.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const userData = await
//         user.findOne({ email, password });  
//         if (!userData) {
//             return res.status(400).json({ error: 'Invalid email or password' });
//         }
//         res.status(200).json({ user: userData });
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// }
// )

routes.post('/login', async (req, res) => {
    const { identifier, password } = req.body; // Accepts either email or username

    try {
        // Find user by email or username
        const userData = await user.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ],
            password // For demo only; in production, use hashed passwords!
        });

        if (!userData) {
            return res.status(400).json({ error: 'Invalid username/email or password' });
        }

        res.status(200).json({ user: userData });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});








const Countries = require('../Modules/countries');

routes.post('/survey', async (req, res) => {
    const { username, country, scores, totalScore } = req.body;

    if (!username || !country || !scores || typeof totalScore !== 'number') {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Check if user has submitted a survey in the last 30 days
    try {
        const lastSurvey = await Survey.findOne({ username, country }).sort({ createdAt: -1 });

        if (lastSurvey) {
            const now = new Date();
            const lastDate = new Date(lastSurvey.createdAt);
            const diff = now - lastDate;
            const days = diff / (1000 * 60 * 60 * 24);

            if (days < 30) {
                const nextAllowed = new Date(lastSurvey.createdAt);
                nextAllowed.setDate(nextAllowed.getDate() + 30);
                return res.status(400).json({
                    error: "You can only submit the survey once every 30 days.",
                    nextAllowed
                });
            }
        }

        // Save survey
        const survey = new Survey({
            username,
            country,
            scores,
            totalScore
        });
        await survey.save();

        // Update or create country stats
        let countryDoc = await Countries.findOne({ CountryName: country });
        if (countryDoc) {
            countryDoc.TotalUser += 1;
            countryDoc.TotalScore += totalScore;
            countryDoc.Healthcare += scores.healthcare;
            countryDoc.Education += scores.education;
            countryDoc.Employment += scores.employment;
            countryDoc.Transportation += scores.transportation;
            countryDoc.PublicSafety += scores.publicSafety;
            await countryDoc.save();
        } else {
            countryDoc = new Countries({
                CountryName: country,
                TotalUser: 1,
                TotalScore: totalScore,
                Healthcare: scores.healthcare,
                Education: scores.education,
                Employment: scores.employment,
                Transportation: scores.transportation,
                PublicSafety: scores.publicSafety
            });
            await countryDoc.save();
        }

        res.status(201).json({ survey, country: countryDoc });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// get survey data for a user by username and country
routes.get('/survey', async (req, res) => {
    const { username, country } = req.query;

    if (!username || !country) {
        return res.status(400).json({ error: "Username and country are required." });
    }

    try {
        // FIX: filter by username and country
        const survey = await Survey.findOne({ username, country });
        if (!survey) {
            return res.status(404).json({ error: "No survey found for this user in the specified country." });
        }
        res.status(200).json(survey);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


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
// ...existing code...
module.exports = routes ;

