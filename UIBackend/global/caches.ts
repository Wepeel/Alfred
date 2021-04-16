import { RedisCache } from "@common/cache";
import { IHospital, Hospital } from "@models_dir/hospital";
import { IPatient, Patient } from "@models_dir/patient";
import { Promise as BBPromise } from 'bluebird';


export let hospitalCache = new RedisCache<IHospital>();
export let patientCache = new RedisCache<IPatient>();

/**
 * Initialize global hospital cache
 * @async
 */
async function initializeHospitalCache() {
    const result = await Hospital.find().sort({ createdAt: -1 });

    await BBPromise.map(result, async (hosp: IHospital) => {
        await hospitalCache.set(hosp.id, hosp);
    });
}

/**
 * Initialize global patient cache
 * @async
 */
async function initializePatientCache() {
    const result = await Patient.find().sort({ createdAt: -1 });

    await BBPromise.map(result, async (patient: IPatient) => {
        await patientCache.set(patient.id, patient);
    });
}

/**
 * Initialize global caches
 * @async
 */
export async function initializeCaches() {
    await initializeHospitalCache();
    await initializePatientCache();
}