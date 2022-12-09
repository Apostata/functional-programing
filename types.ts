export type MathFuncOneParam = (x: number) => number
export type MathFuncOneParamReturnArray = (x: number) => [number, string]
export type MathFuncOneParamPromise = (x: number) => Promise<number>

export type MathFuncCompose = (...args:MathFuncOneParam[]) => MathFuncOneParam
export type MathFuncComposeArray = (args:MathFuncOneParam[]) => MathFuncOneParam
export type MathFuncComposeReturnArray = (...args:MathFuncOneParamReturnArray[]) => MathFuncOneParamReturnArray

export type Compose = (...fns: (MathFuncOneParam | MathFuncOneParamPromise) []) => (x: number) => Promise<number>
export type Compose2 = (...fns: (MathFuncOneParam | MathFuncOneParamPromise) []) => (x: number) => Promise<number>




