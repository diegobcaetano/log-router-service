import type { FilterRule } from "../configuring/ConfigFile";
import { EqualsFilterStrategy } from "./EqualsFilterStrategy";
import { FilterStrategyFactory } from "./FilterStrategy";

test(`Instantiate a new EqualsFilterStrategy`, () => {
    
    const filterRule: FilterRule = {
        target: `status`,
        operator: `equals`,
        content: 500
    };
    const factory = new FilterStrategyFactory();
    const filterStrategy = factory.build(filterRule);
    expect(filterStrategy).toBeInstanceOf(EqualsFilterStrategy);
});

test(`Throws an Error when try to create a not available filter strategy`, () => {

    const filterRule: FilterRule = {
        target: `status`,
        operator: `in`,
        content: 500
    };
    const factory = new FilterStrategyFactory();
    expect(() => factory.build(filterRule)).toThrow(Error);
});