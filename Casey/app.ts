require('module-alias/register');


import { hospitalCache } from "@global/caches";
import { logger } from "@global/logger";
import { doctorClient, server, ServerCredentials } from "@global/grpc";

server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
    logger.info(`Started listening to gRPC on 50051`);
    server.start();
});