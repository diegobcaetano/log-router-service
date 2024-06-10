import type { FilterRule } from "../configuring/ConfigFile"

export interface StreamFilter<T> {
    getRules(): FilterRule[]
    filter(record: T): boolean
}

