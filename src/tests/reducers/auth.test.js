import authReducer from '../../reducers/auth';

const uid=456;

test('should set uid for login', () => {
  const action = {
    type: 'LOGIN', 
    uid  // the state
  };
  const state=authReducer({}, action);
  expect(state.uid).toEqual(action.uid);
});

test('should clear uid for logout', () => {
  const action = { type: 'LOGOUT'};
  const state=authReducer({ uid }, action);
  expect(state).toEqual({}); // no matter what you send, {} is returned
});