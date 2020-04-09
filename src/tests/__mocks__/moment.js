// mocked version of moment()
// need to import the ACTUAL moment explicitly
//  see jest docs: manual-mocks.html:
const moment = require.requireActual('moment');

export default (timestamp = 0) => {
  return moment( timestamp ); // return a moment at that point in time
};