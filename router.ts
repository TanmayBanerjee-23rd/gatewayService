import express from "express";
import { get, post, put, del } from "superagent";

import config from "./config";

const router = express.Router();

router.use( express.json( { type: "application/json" } ) );

router.get( "/:serviceName/*", ( req, res ) => {

    get( generateBaseUrl( req ) + req.originalUrl )
    .end( (err, response) => endHandler( err, response, res ) );

} );

router.post( "/:serviceName/*", ( req, res ) => {

    post( generateBaseUrl( req ) + req.baseUrl )
    .send( req.body )
    .end( (err, response) => endHandler( err, response, res ) );

} );

router.put( "/:serviceName/*", ( req, res ) => {

    put( generateBaseUrl( req ) + req.baseUrl )
    .send( req.body )
    .end( (err, response) => endHandler( err, response, res ) );

} );

router.delete( "/:serviceName/*", ( req, res ) => {

    del( generateBaseUrl( req ) + req.baseUrl )
    .end( (err, response) => endHandler( err, response, res ) );

});

const endHandler = ( err, response, res ) => {
    if ( err ) {
        return res.status( 500 ).json( { 
            authenticated: false, 
            authorized: null, 
            message: err.message 
        } );
    }

    res.json( JSON.parse(response.text) );
};

const generateBaseUrl = ( req ): string => {

    let baseURL : string | undefined = undefined;
    const { serviceName } = req.params;

    if ( serviceName === "auth" ) {
        baseURL = config.AuthServiceBaseURL;
    } else baseURL = config.UserServiceBaseURL;

    return baseURL;
};

export default router;