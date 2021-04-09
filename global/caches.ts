import Cache from "@common/cache";
import { IHospital, Hospital } from "@models_dir/hospital";
import { IPatient, Patient } from "@models_dir/patient";


export let hospitalCache = new Cache<IHospital>();
export let patientCache = new Cache<IPatient>();

async function initializeHospitalCache() {
    const result = await Hospital.find().sort({ createdAt: -1 });
    await hospitalCache.mset(
        result.map((hospital: IHospital) => {
            return { key: hospital.id, val: hospital };
        })
    );
}

async function initializePatientCache() {
    const result = await Patient.find().sort({ createdAt: -1 });
    await patientCache.mset(
        result.map((patient: IPatient) => {
            return { key: patient.id, val: patient };
        })
    );
}

export async function initializeCaches() {
    await initializeHospitalCache();
    await initializePatientCache();
}