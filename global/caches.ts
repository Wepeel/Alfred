import Cache from "@common/cache"
import { Schema } from 'mongoose'
import { IHospital } from "@models_dir/hospital"


export const hospitalCache = new Cache<Schema.Types.ObjectId, IHospital>(50);