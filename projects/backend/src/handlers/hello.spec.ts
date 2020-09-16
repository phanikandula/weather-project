import {helloBuilder} from './hello'

import * as chai from 'chai';

const expect =chai.expect

describe('helloBuilder', () => {
    it('returns value same as input', ()=> {
        const output = helloBuilder('foo');
        expect(output.hello).to.equal('foo');
    })
})
