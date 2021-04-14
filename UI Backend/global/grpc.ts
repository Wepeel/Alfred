import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

import { ProtoGrpcType } from "@generated/doctor";

const DOCTOR_PROTO_PATH = `${__dirname}/../../common/protos/doctor.proto`;

const doctorPackageDefinition = loadSync(
    DOCTOR_PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const doctorProto = ((loadPackageDefinition(doctorPackageDefinition) as unknown) as ProtoGrpcType).doctor;

export const doctorClient = new doctorProto.DoctorService(
    'localhost:50051',
    credentials.createInsecure());