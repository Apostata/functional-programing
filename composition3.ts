import { MathFuncCompose, MathFuncOneParam } from "./types";

const add5:MathFuncOneParam = (x) => x + 5
const double:MathFuncOneParam = (x) => x * 2
const deduct3:MathFuncOneParam =(x) => x - 3


const compose: MathFuncCompose = (...funcs) => (x) => {
	return funcs.reduce((acc, func) =>{
		return func(acc)
	}, x)
}

const app = compose(add5, double, deduct3)
console.log(app(5))
// >> 17 

//  podemos ver que acrecenstando outra função a aplicação ainda funciona perfeitamente
const app2 = compose(add5, double, deduct3, double)
console.log(app2(5))
// >> 34