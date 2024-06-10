import type { WSLog } from '../WSLog';
import type { FilterRule } from '../configuring/ConfigFile';
import { EqualsFilterStrategy } from './EqualsFilterStrategy';
import type { FilterStrategy, FilterStrategyConstructor } from './FilterStrategy';
import { WSLogFilter } from './WSLogFilter';

let equalsOperatorFilterFactory: FilterStrategyConstructor;
let rules: FilterRule[];
let wsLog: WSLog;

beforeEach(() => {

    equalsOperatorFilterFactory = {
        build(filterRule): FilterStrategy {
            return new EqualsFilterStrategy(filterRule.target, filterRule.content);
        },
    };

    rules = [{
        target: `status`,
        operator: `equals`,
        content: 200
    }];

    wsLog = {
        ip: `0.0.0.0`,
        date: new Date(),
        method: `POST`,
        status: 200,
        url: `index.html`
    };
});


test(`Filter returns true because the record matches the target and content`, () => {
    
    const logFilter = new WSLogFilter(equalsOperatorFilterFactory, rules);
    const result = logFilter.filter(wsLog);
    expect(result).toBe(true);
});

test(`Filter returns true because the record matches the target and content with 2 rules`, () => {
    
    rules.push({
        target: `method`,
        operator: `equals`,
        content: `POST`
    });

    const logFilter = new WSLogFilter(equalsOperatorFilterFactory, rules);
    const result = logFilter.filter(wsLog);
    expect(result).toBe(true);
});

test(`Filter returns false because the condition does not match`, () => {
    
    wsLog.status = 400;
    const logFilter = new WSLogFilter(equalsOperatorFilterFactory, rules);
    const result = logFilter.filter(wsLog);
    expect(result).toBe(false);
});

test(`Filter returns false because one of two conditions does not match`, () => {
    
    rules.push({
        target: `method`,
        operator: `equals`,
        content: `PUT`
    });

    const logFilter = new WSLogFilter(equalsOperatorFilterFactory, rules);
    const result = logFilter.filter(wsLog);
    expect(result).toBe(false);
});

test(`Gets the rules defined for the filter`, () => {
    
    const logFilter = new WSLogFilter(equalsOperatorFilterFactory, rules);
    const result = logFilter.getRules();
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject(rules[0]);
});