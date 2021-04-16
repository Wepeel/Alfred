import { loadPackageDefinition, credentials, Server, ServerUnaryCall, sendUnaryData, ServerCredentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

import { ProtoGrpcType as DoctorGrpcType } from "@generated/doctor";
import { ProtoGrpcType as HospitalGrpcType } from "@generated/hospital";

const DOCTOR_PROTO_PATH = `${__dirname}/../../common/protos/doctor.proto`;
const HOSPITAL_PROTO_PATH = `${__dirname}/../../common/protos/doctor.proto`;

const doctorPackageDefinition = loadSync(
    DOCTOR_PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const doctorProto = ((loadPackageDefinition(doctorPackageDefinition) as unknown) as DoctorGrpcType).doctor;

export const doctorClient = new doctorProto.DoctorService(
    'localhost:50051',
    credentials.createInsecure());

const hospitalPackageDefinition = loadSync(
    HOSPITAL_PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const hospitalProto = ((loadPackageDefinition(hospitalPackageDefinition) as unknown) as HospitalGrpcType).hospital;

const server = new Server();
server.addService(hospitalProto.HospitalService.service, { findHospital });

server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
    server.start();
});

function findHospital(call: ServerUnaryCall<typeof hospitalProto.CaseInfoRequest, typeof hospitalProto.HospitalResponse>,
    callback: sendUnaryData<typeof hospitalProto.HospitalResponse>) {

}