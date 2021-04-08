import Cache from "@common/cache"
import { Schema } from 'mongoose'
import { IHospital, Hospital } from "@models_dir/hospital"
import { hospitalIndexGet } from "@controllers_dir/hospitalController";


export let hospitalCache = new Cache<string, IHospital>(50);

async function initializeHospitalCache() {
    const result = await Hospital.find().sort({ createdAt: -1 });
    await hospitalCache.setArray(
        result.map((hospital: IHospital) => hospital.id),
        result
    );
}

export async function initializeCaches() {
    await initializeHospitalCache();
}