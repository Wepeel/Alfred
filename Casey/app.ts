import { hospitalCache } from "@global/caches";
import { logger } from "@global/logger";
import { doctorClient } from "@global/grpc";

logger.info(`Started listening to gRPC on 50051`);