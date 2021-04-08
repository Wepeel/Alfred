import {Schema, model} from 'mongoose';

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

const Doctor = model('Doctor', doctorSchema);
export = Doctor;