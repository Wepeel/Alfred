import { Schema, Document, model, Model } from 'mongoose';

export interface IHospital extends Document {
    name: string;
    longitude: number;
    latitude: number;
    load_percentage: number;
}

const hospitalSchema = new Schema(
    {
        name:
        {
            type: String,
            required: true
        },

        longitude:
        {
            type: Number,
            required: true
        },

        latitude:
        {
            type: Number,
            required: true
        },

        load_percentage:
        {
            type: Number,
            required: true
        }

    }, { timestamps: true });

export const Hospital: Model<IHospital> = model('Hospital', hospitalSchema);