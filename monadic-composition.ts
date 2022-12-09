import { MathFuncComposeReturnArray, MathFuncOneParamReturnArray } from "./types"

const add5:MathFuncOneParamReturnArray = (x) =>[ x + 5, '+ 5']
const double:MathFuncOneParamReturnArray = (x) =>[ x * 2, '* 2']
const deduct3:MathFuncOneParamReturnArray =(x) => [x - 3, '- 3']

const compose: MathFuncComposeReturnArray = (...funcs) => (x) => {
	return funcs.reduce(([x, desc], func) =>{
		const [x2, desc2] = func(x)
		return [x2, `${desc} ${desc2}`]
	}, [x, 'x'])
}

const app = compose(add5,deduct3, double)
console.log(app(10))