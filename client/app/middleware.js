const injectUserIdMiddleware = (api) => (next) => (action) => {
  
  const endpointsRequiringUserId = ['getItineraries', 'updateItinerary', 'deleteItinerary'];

  if (action.type.startsWith('api/') && action.type.endsWith('/pending')) {
    const endpointName = action.meta.arg.endpointName;
    
    if (endpointsRequiringUserId.includes(endpointName)) {
      // GET STATE TO RETRIEVE user_id
      const state = api.getState();

      // RETRIEVE user_id FROM STATE
      const userId = 26; //state.authState.userInfo ? state.authState.userInfo.user_id : null;

      if (!userId) {
        console.log(`❌ ::Failed:: Injection of User ID ${userId} into action for endpoint ${endpointName} (if not logged in, ignore)`);
        return; // ABANDON SHIP, user_id is NULL
      }

      // INJECTING user_id into HTTP REQUESTS IDENTIFIED IN endpointsRequiringUserId
      action.meta.arg.originalArgs = {
        ...action.meta.arg.originalArgs,
        userId
      };

      console.log(`✅ ::Succeeded:: Injection of User ID ${userId} into action for endpoint ${endpointName}`);
    }
  }
  return next(action);
};

const apiCallLogMiddleware = (store) => (next) => (action) => {
  console.log('🎧 ➡️ Middleware Action Listener::', action);
  return next(action);
};




export { injectUserIdMiddleware, apiCallLogMiddleware };