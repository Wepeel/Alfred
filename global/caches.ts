import Cache from "@common/cache"
import { Schema } from 'mongoose'
import { IHospital, Hospital } from "@models_dir/hospital"
import { hospitalIndexGet } from "@controllers_dir/hospitalController";


export let hospitalCache = new Cache<IHospital>();

async function initializeHospitalCache() {
    const result = await Hospital.find().sort({ createdAt: -1 });
    await hospitalCache.mset(
        result.map((hospital: IHospital) => {
            return { key: hospital.id, val: hospital }
        })
    );
}

export async function initializeCaches() {
    await initializeHospitalCache();
}