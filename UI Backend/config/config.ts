class Config {
    mongoUrl: string;
}

/**
 * @hidden
 */
const config: Config = {
    mongoUrl: "mongodb+srv://wepeel:test1234@patients.bdv4e.mongodb.net/patients?retryWrites=true&w=majority"
};

export = config;