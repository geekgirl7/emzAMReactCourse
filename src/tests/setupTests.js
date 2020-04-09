import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DotEnv from 'dotenv';

DotEnv.config({ path: '.env.test' });

// use lower case for the adapter property
Enzyme.configure({
  adapter: new Adapter()
});

// Note: this is all we need for the setupTests.js file 