import { Schema, model } from 'mongoose';

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

const Patient = model('Patient', patientSchema);
export = Patient;