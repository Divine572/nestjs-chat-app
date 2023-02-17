import { registerAs } from '@nestjs/config';

const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * Mongo database connection config
 */
export default registerAs('mongodb', () => {
    const { MONGO_DEV_URI, MONGO_PROD_URI } = process.env;
    return {
        uri: isDevelopment ? `${MONGO_DEV_URI}` : `${MONGO_PROD_URI}`,
    };
});



