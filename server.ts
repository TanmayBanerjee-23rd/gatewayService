import express, { urlencoded } from "express";
import Routers from "./router";
import Authenticator from "./Authenticator";

const app = express();

app.use( urlencoded( { extended: true } ) );

app.use( "/", Authenticator.verify, Routers );

const server = app.listen( process.env.PORT || 9000 );

console.log( "Gateway service is listening at port 9000!" );

export default server;