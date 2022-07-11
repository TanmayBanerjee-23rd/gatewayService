import { get } from "superagent";
import  config from "./config";
import jwt from "jsonwebtoken"

class Authenticator {

    // constructor(){
    //     this.extractTokenString.bind( this );
    // }
    
    verify( req, res, next ) {
        const excludeModuleNames: string[] = [ "orders", "categories", "subcategories" ];

        if ( excludeModuleNames.includes( req.originalUrl.split( '/' )[ 2 ] ) ) return next( null );

        const token = req.headers.authorization.split( ' ' )[ 1 ];
        try {
            const decoded = jwt.verify( token, config.jwtSecret );

            if ( decoded ) {
                req.tokenData = {
                    isValid: true,
                    decodedToken: decoded
                };

                return next( null );

            } else {

                res.status( 500 ).json({
                    isValid: false,
                    message: "Invalid JWT token!"
                });
            }

        } catch( err ) {

            res.status( 500 ).json({
                isValid: false,
                message: err.message
            });
        }
    };

    extractTokenString( authorization ) {
        return authorization.split( ' ' )[ 1 ];
    };

};

export default ( new Authenticator() );