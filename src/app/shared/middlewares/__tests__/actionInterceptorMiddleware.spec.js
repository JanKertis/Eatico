/**
 * @author Michal Kvasničák <michal.kvasnicak@mink.sk>
 * @copyright Mink, ltd 2015
 */

import middlewareInitializer from '../actionInterceptorMiddleware';
import { expect } from 'chai';
import { spy } from 'sinon';

describe('shared/middlewares/actionInterceptorMiddleware', () => {
    let calls;
    let middleware;
    let handlerSpy;

    beforeEach(() => {
        calls = [];
        handlerSpy = spy();

        middleware = middlewareInitializer({
            'REDIRECT': handlerSpy
        })()((action) => calls.push(action));
    });

    it('should send not intercepted action to next middleware', () => {
        const action = { type: 'TEST' };

        middleware(action);

        expect(calls).to.have.length(1);
        expect(calls[0]).to.be.eql(action);
    });

    it('should call registered handler for given action with action as parameter', () => {
        const action = { type: 'REDIRECT' };

        middleware(action);

        expect(calls).to.have.length(0);
        expect(handlerSpy.calledOnce).to.be.equal(true);
        expect(handlerSpy.getCall(0).calledWith(action)).to.be.equal(true);
    });
});
