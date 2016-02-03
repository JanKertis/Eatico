/**
 * @author Michal Kvasničák <michal.kvasnicak@mink.sk>
 * @copyright Mink, ltd 2015
 */

import middleware from '../promiseMiddleware';
import { expect } from 'chai';

describe('shared/middlewares/promiseMiddleware', () => {
    it('should send action to next middleware if action does not contain promise', () => {
        let sentAction;

        const next = (action) => sentAction = action;
        const action = { type: 'not promise' };

        expect(
            middleware(
                { dispatch() { throw new Error('Should not be called.'); } }
            )(next)(action)
        ).to.be.equal(action);
        expect(sentAction).to.be.equal(action);
    });

    it('should dispatch first action in order on promise start and then success action with result on fulfillment', () => {
        const recordedActions = [];
        const dispatchedActions = [];
        let mwDispatch;

        const dispatch = (action) => {
            dispatchedActions.push(action);
            return mwDispatch(action);
        };

        const next = (action) => {
            recordedActions.push(action);
            return action;
        };

        mwDispatch = middleware({ dispatch })(next);

        const action = {
            types: ['START', 'SUCCESS'],
            haha: true,
            promise: Promise.resolve({ success: true })
        };

        return mwDispatch(action).then((processedAction) => {
            expect(dispatchedActions).to.have.length(2);
            expect(dispatchedActions[0].type).to.be.equal('START');
            expect(dispatchedActions[0].haha).to.be.equal(true);
            expect(dispatchedActions[1].type).to.be.equal('SUCCESS');
            expect(dispatchedActions[1].haha).to.be.equal(true);
            expect(dispatchedActions[1].result).to.be.eql({ success: true });
            expect(recordedActions).to.be.eql(dispatchedActions);

            expect(processedAction).to.be.equal(dispatchedActions[1]);
        });
    });

    it('should send first action in order on promise start and then failure action with result on rejection', () => {
        const recordedActions = [];
        const dispatchedActions = [];
        let mwDispatch;

        const dispatch = (action) => {
            dispatchedActions.push(action);
            return mwDispatch(action);
        };

        const next = (action) => {
            recordedActions.push(action);
            return action;
        };

        mwDispatch = middleware({ dispatch })(next);

        const action = {
            types: ['START', 'SUCCESS', 'FAILURE'],
            haha: true,
            promise: Promise.reject({ error: 'ha' })
        };

        return mwDispatch(action).catch((processedAction) => {
            expect(dispatchedActions).to.have.length(2);
            expect(dispatchedActions[0].type).to.be.equal('START');
            expect(dispatchedActions[0].haha).to.be.equal(true);
            expect(dispatchedActions[1].type).to.be.equal('FAILURE');
            expect(dispatchedActions[1].haha).to.be.equal(true);
            expect(dispatchedActions[1].error).to.be.eql({ error: 'ha' });
            expect(recordedActions).to.be.eql(dispatchedActions);

            expect(processedAction).to.be.equal(dispatchedActions[1]);
        });
    });
});
