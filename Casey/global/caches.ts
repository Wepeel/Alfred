import { RedisCache } from "@common/cache";
import { IHospital } from "@models_dir/hospital";


export const hospitalCache = new RedisCache<IHospital>();