import { MathFuncCompose, MathFuncOneParam } from "./types";


const add5:MathFuncOneParam = (x) => x + 5
const double:MathFuncOneParam = (x) => x * 2

const compose:MathFuncCompose = (f1, f2) => (x) => f2(f1(x))

const app = compose(add5, double);
console.log(app(3))