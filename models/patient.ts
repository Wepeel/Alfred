import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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

const Patient = mongoose.model('Patient', patientSchema);
export = Patient;