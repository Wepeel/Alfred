import { Schema, Document, model, Model } from 'mongoose';

export interface IDoctor extends Document {
    first_name: string;
    last_name: string;
    hospital: string;
    department: string;
}

const doctorSchema = new Schema(
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
            type: Schema.Types.ObjectId,
            required: true
        },

        department:
        {
            type: String,
            required: true
        }

    }, { timestamps: true });

export const Doctor: Model<IDoctor> = model('Doctor', doctorSchema);