export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid:action.uid  // dispatch = have to pass in the uid
      };
    break;

    case 'LOGOUT':
      return {}; 
    break;
 
    default:
      return state; // we don't care if it's not a login/logout action 
  }
};