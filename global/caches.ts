import Cache from "@common/cache"
import { IHospital, Hospital } from "@models_dir/hospital"


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