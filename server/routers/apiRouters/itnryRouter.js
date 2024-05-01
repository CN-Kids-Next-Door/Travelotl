const express = require('express');
const itnryRouter = express.Router();

const itnryController = require('../../controllers/itnryController.js');
const authController = require('../../controllers/authController.js');
const vaultController = require('../../controllers/vaultController.js');

itnryRouter
  .get('/:itnry_id',
    /**
     *  GET METHOD MESSAGES TO ['/api/itnry/:itnry_id']
     *  GET ALL RECORDS: (:itnry_id is set to all)
     * 
     */ 
    // vaultController.initializeItnry_id,

    // authController.protectJWT, 
    // itnryController.retrieveAll, 
    (req, res) => {
    // console.log(res.locals.allTrips[0]._id);
      return res.status(200).json(res.locals.allTrips);
    }
  )
  .get('/:itnry_id',
      /**
     *  GET METHOD MESSAGES TO ['/api/itnry/:itnry_id']
     *  GET THIS RECORD: (:itnry_id is set to itnry_id slated for retrieval)
     * 
     */ 
  )
  .patch('/:itnry_id',
    /**
     * PATCH METHOD HANDLER TO ['/api/itnry/:itnry_id']
     * EDIT THIS RECORD:  (:itnry_id is set to recordId slated for edit )
     *                    ( && req.body contains edit info )
     */

    (req, res, next)=>next(),
    (req, res, next)=>next(),
    (req, res)=>res.status(200).json('PATCH to /api/itnry'),
  )
  .post('/', 
    /**
     * POST METHOD MESSAGES TO ['/api/itnry/']
     * ADD A RECORD FOR USER: (no req.params && req.body contains new record information)
     */
    (req, res, next)=>{
      console.log("first step")
      return next();
    },

    vaultController.initializeItnryVault,
    vaultController.populateItnryVault,
    // authController.jwtReqCheck,          // COMMENT OUT TO DISABLE JWT CHECK
    // authController.jwtDecode,            // COMMENT OUT TO DISABLE JWT CHECK
    itnryController.buildTrip, 
    vaultController.parseItinerary_ai,
    itnryController.saveItnry, 
    vaultController.resLocalsItnrySave,
    vaultController.cleanupItnryVault,    
    (req, res) => {
      return res.status(201).send( res.locals );
    }
  )
  .delete('/:itnry_id', 
    /**
     * DELETE METHOD MESSAGES TO ['/api/itnry/:itnry_id']
     * DELETE ALL RECORDS: (:itnry_id is set to all) 
     * DELETE THIS RECORD: (:itnry_id is set to the itnry_id slated for deletion)
     */
    (req, res, next ) => { console.log("reached delete"); return next(); },
    vaultController.checkItnry_id,
    vaultController.initializeItnryVault,
    vaultController.populateItnry_id,
    // authController.jwtReqCheck,          // COMMENT OUT TO DISABLE JWT CHECK
    // authController.jwtDecode,            // COMMENT OUT TO DISABLE JWT CHECK
    itnryController.deleteItnry, 
    vaultController.resLocalsItnrySave, 
    vaultController.cleanupItnryVault,
    (req, res) => {
      return res.status(200).send( res.locals );
    }
  );

module.exports = itnryRouter;