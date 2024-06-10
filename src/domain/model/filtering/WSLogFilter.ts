import type { FilterRule } from "../configuring/ConfigFile";
import type { StreamFilter } from "./StreamFilter";
import type { WSLog } from "../WSLog";
import type {  FilterStrategyConstructor } from "./FilterStrategy";

export class WSLogFilter implements StreamFilter<WSLog> {

    private rules: FilterRule[];
    private filterStrategyFactory: FilterStrategyConstructor;

    constructor(filterStrategyFactory: FilterStrategyConstructor, rules: FilterRule[]) {
        this.filterStrategyFactory = filterStrategyFactory;
        this.rules = rules;
    }

    getRules(): FilterRule[] {
        return this.rules;
    }
    
    filter(record: WSLog): boolean {
        const hasInvalidConditions =  this.rules.filter(rule => {
            const filterStrategy = this.filterStrategyFactory.build(rule);
            return filterStrategy.filter(record) === false;
        });

        return hasInvalidConditions.length === 0;
    }
}