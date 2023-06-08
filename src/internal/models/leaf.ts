export interface TreeInfo {
    [key: string]: {
        pathElement: string[],
        pathIndices: number[],
        pathPosition: number[],
        pathRoot: string,
    }
}