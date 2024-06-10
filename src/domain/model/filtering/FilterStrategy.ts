import type { FilterRule } from "../configuring/ConfigFile"
import { EqualsFilterStrategy } from "./EqualsFilterStrategy";

export interface FilterStrategy {
    filter(record: object): boolean
}

export interface FilterStrategyConstructor {
    build(filterRule: FilterRule): FilterStrategy
}

export class FilterStrategyFactory implements FilterStrategyConstructor {
    
    build(filterRule: FilterRule): FilterStrategy { 

        switch(filterRule.operator) {
            case `equals`: return new EqualsFilterStrategy(filterRule.target, filterRule.content);
            default: throw Error(`Can't find a filter strategy for the operator: ${filterRule.operator}`);
        }
    }


}