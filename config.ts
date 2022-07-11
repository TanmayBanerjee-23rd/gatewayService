const config = {
    dev: {
        AuthServiceBaseURL: "http://localhost:8000",
        UserServiceBaseURL: "http://localhost:6000",
        jwtSecret: "asnbiub234&*#$Y*",
    }
};

export default config[ process.env.ENV || "dev" ]