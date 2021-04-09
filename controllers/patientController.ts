import { Patient } from '@models_dir/patient';
import express from 'express';
import { logger } from '@global/logger';
import { patientCache } from "@global/caches"

export const patientIndexGet = async (req: express.Request, res: express.Response) => {
    try {
        const result = Array.from(await patientCache.values());
        res.render('patient_index', { patients: result, title: 'All patients' });
        logger.debug(result);
    }
    catch (err) {
        logger.error(err);
    }
};

export const patientInfoGet = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    try {
        let result;
        if (await patientCache.has(id)) {
            result = await patientCache.get(id);
        }
        else {
            result = await Patient.findById(id);
            await patientCache.set(id, result);
        }
        res.render('patient', { patient: result, title: 'Patient Info' });
    }
    catch (err) {
        logger.error(err);
        res.render('404', { title: "Couldn't find patient" });
    }
};

export const patientIndexPost = async (req: express.Request, res: express.Response) => {
    const patient = new Patient(req.body);
    try {
        await patientCache.set(patient.id, patient);
        res.redirect('/patients');
    }
    catch (err) {
        res.send("BAD");
    }
};

export const patientIndexDelete = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    try {
        await patientCache.delete(id);
        res.redirect('/patients');
    }

    catch (err) {
        logger.error(err);
    }
};

export const patientIndexPut = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    try {
        let result;
        if (await patientCache.has(id)) {
            result = await patientCache.get(id);
        }
        else {
            result = await Patient.findById(id);
            await patientCache.set(id, result);
        }
        const patient = await Patient.findById(id);
        patient.set(req.body);
        await patientCache.set(id, patient);
        res.redirect('/patients');
    }

    catch (err) {
        logger.error(err);
    }
};