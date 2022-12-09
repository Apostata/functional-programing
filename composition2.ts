import { MathFuncCompose, MathFuncComposeArray, MathFuncOneParam } from "./types";

const add5:MathFuncOneParam = (x) => x + 5
const double:MathFuncOneParam = (x) => x * 2
const deduct3:MathFuncOneParam =(x) => x - 3

const compose: MathFuncComposeArray = (funcs) => (x) => {
	return funcs.reduce((acc, func) =>{
		return func(acc)
	}, x)
}

const compose2: MathFuncCompose = (...funcs) => (x) => {
	return funcs.reduce((acc, func) =>{
		return func(acc)
	}, x)
}

const app = compose([add5, double, deduct3])
const app2 = compose2(add5, double, deduct3)

console.log(app(5))
console.log(app2(5))