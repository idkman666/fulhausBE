import express from 'express';
import dotenv from 'dotenv';
import AcronymModel from '../models/Acronym.js';

dotenv.config();

const router = express.Router();


router.get('/acronym', async (req, res) => {
    let result = {};
    if (req.query.search) {
        const regex = new RegExp(escapedRegex(req.query.search), 'gi');
        try {
            const { page, limit } = req.query;
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(limit, 10) || 10
            }
            result = await AcronymModel.paginate({ $or: [{ acronym: regex }, { definition: regex }] }, options);
            res.status(200).json(result);
        } catch (err) {
            res.json({ message: err.message });
        }
    } else {
        const { page, limit } = req.query;
        const options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(limit, 10) || 10
        }
        try {
            result = await AcronymModel.paginate({}, options);
            res.json(result);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }

    }

});

function escapedRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

router.post('/acronym', async (req, res) => {
    let _acronym = req.body.acronym;
    let _definition = req.body.definition;

    try {
        const payload = new AcronymModel({
            acronym: _acronym,
            definition: _definition
        });
        const savedData = await payload.save();
        res.status(201).json(savedData);
    } catch (err) {
        res.json({ message: err.message });
    }

});

router.patch('/acronym/:acronymID', async (req, res) => {
    let acronymID = req.params.acronymID;

    try {
        let newAcronym = await AcronymModel.findById(acronymID);
        if(newAcronym === null){
            res.status(404).send({message: "Resourse not found for the id provided"});
        }
        newAcronym.acronym = req.body.acronym;
        newAcronym.definition = req.body.definition;
        await newAcronym.save();
        res.status(200).send({message: "Update Success."});
    } catch (err) {
        console.log(`Error updatting: ${err.message}`);
        res.status(400).send({ message: err.message });
    }
});

router.delete('/acronym/:acronymID', async (req, res) => {
    try {
        let result = await AcronymModel.findByIdAndDelete(req.params.acronymID);
        if(result === null){
            res.status(404).send({message: "Resourse not found for deletion."});
        }else{
            res.status(204).send({ message: "Delete successful." });
        }
        
    } catch (err) {
        res.status(400).send({message:"Delete failed."});
    }

});


export default router;