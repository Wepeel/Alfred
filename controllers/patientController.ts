import { Patient } from '@models_dir/patient';
import express from 'express'
import { logger } from '@global/logger'

export const patientIndexGet = async (req: express.Request, res: express.Response) => {
    try {
        const result = await Patient.find().sort({ createdAt: -1 })
        res.render('patient_index', { patients: result, title: 'All patients' });
        logger.debug(result);
    }
    catch (err) {
        logger.error(err);
    };
};

export const patientInfoGet = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    try {
        const result = await Patient.findById(id);
        res.render('patient', { patient: result, title: 'Patient Info' });
    }
    catch (err) {
        logger.error(err);
        res.render('404', { title: "Couldn't find patient" });
    };
};

export const patientIndexPost = async (req: express.Request, res: express.Response) => {
    const patient = new Patient(req.body);
    try {
        await patient.save();
        res.redirect('/patients');
    }
    catch (err) {
        res.send("BAD");
    }
};

export const patientIndexDelete = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    try {
        await Patient.findByIdAndDelete(id);
        res.redirect('/patients');
    }

    catch (err) {
        logger.error(err);
    }
};

export const patientIndexPut = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    try {
        const patient = await Patient.findById(id);
        patient.set(req.body);
        await patient.save();
        res.redirect('/patients');
    }

    catch (err) {
        logger.error(err);
    }
}