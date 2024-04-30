const express = require('express');
const itnryRouter = express.Router();

const tripController = require('../../controllers/itnryController.js');
const authController = require('../../controllers/authController.js');

itnryRouter
  .get('/:itnryId',
    /**
     *  GET METHOD MESSAGES TO ['/api/:itnryId']
     *  GET ALL RECORDS: (:itnryId is set to all)
     *  GET THIS RECORD: (:itnryId is set to itnryId slated for retrieval)
     * 
     */ 

    // authController.protect, 
    // tripController.retrieveAll, 
    (req, res) => {
    // console.log(res.locals.allTrips[0]._id);
      return res.status(200).json(res.locals.allTrips);
    }
  )
  .patch('/:itnryId',
    /**
     * PATCH METHOD HANDLER TO ['/api/:itnryId']
     * EDIT THIS RECORD:  (:itnryId is set to recordId slated for edit )
     *                    ( && req.body contains edit info )
     */

    (req, res, next)=>next(),
    (req, res, next)=>next(),
    (req, res)=>res.status(200).json('PATCH to /api/itnry'),
  )
  .post('/', 
    /**
     * POST METHOD MESSAGES TO ['/api/']
     * ADD A RECORD FOR USER: (no req.params && req.body contains new record information)
     */

    (req, res, next)=>{
      console.log("build route invoked");
      return next();
    },
    // authController.protect, 
    // tripController.buildTrip, 
    // tripController.saveTrip, 
    (req, res) => {
      return res.status(201).send(res.locals.itinerary);
    }
  )
  .delete('/:itnryId', 
    /**
     * DELETE METHOD MESSAGES TO ['/api/:itnryId']
     * DELETE ALL RECORDS: (:itnryId is set to all) 
     * DELETE THIS RECORD: (:itnryId is set to the itnryId slated for deletion)
     */

    // authController.protect, 
    // tripController.deleteTrip, 
    // tripController.retrieveAll, 
    (req, res) => {
      return res.status(200).send(res.locals.allTrips);
    }
  );

module.exports = itnryRouter;


// SAMPLE DATA
// const travelPlans = {
//   recordId: <recordId>,
//   destination: 'Los Angeles, CA',
//   startDate: 'June 2, 2024',
//   endDate: 'June 8, 2024',
//   activities: [],
//   budget: 500,
//   travelers: 1,
//   groupDescription: 'Solo traveler',
//   loading: false,
//   error: null,
// }