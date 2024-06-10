import type { FilterStrategy } from "./FilterStrategy";

export class EqualsFilterStrategy implements FilterStrategy {

    private target: string;
    private content: string | number;

    constructor(target: string, content: string | number) {
        this.target = target;
        this.content = content;
    }

    filter(record: object): boolean {

        if (!((record as Record<string, unknown>)[this.target])) {
            throw Error("Filter failed: the target does not exists in the object");
        }

        return (record as Record<string, unknown>)[this.target] == this.content;
    }

}