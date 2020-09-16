import {StubWeatherService} from './weather';

import * as chai from 'chai';

const expect =chai.expect

describe('StubWeatherService', () => {
    it('returns value stub value', async ()=> {
        const output = await StubWeatherService('78701');
        expect(output.current).to.equal('80.3');
    })
})

// Not testing OpenWeatherService for now
// because we don't have access to staging version of that service that we can use in CI etc.
