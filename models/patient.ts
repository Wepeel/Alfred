import { Schema, Document, model, Model } from 'mongoose';

export interface IPatient extends Document {
    first_name: string;
    last_name: string;
    hospital: string;
}

const patientSchema = new Schema(
    {
        first_name:
        {
            type: String,
            required: true
        },

        last_name:
        {
            type: String,
            required: true
        },

        hospital:
        {
            type: Schema.Types.ObjectId
        }

    }, { timestamps: true });

export const Patient: Model<IPatient> = model('Patient', patientSchema);