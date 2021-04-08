import { logger } from "@common/logger"
import redis from 'redis';

export function onError(channel: string, message: string) {
    logger.error(channel);
}