import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

import { ProtoGrpcType } from "@generated/doctor";

const PROTO_PATH = "common/proto/doctor.proto";

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const doctorProto = ((grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType).doctor;

export const doctorClient = new doctorProto.DoctorService(
    'localhost:50051',
    grpc.credentials.createInsecure());