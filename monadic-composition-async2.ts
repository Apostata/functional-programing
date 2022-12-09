import { Compose, MathFuncOneParam, MathFuncOneParamPromise} from "./types"

const add5:MathFuncOneParam = (x) => x + 5
const double:MathFuncOneParam = (x) =>x * 2
const deduct3:MathFuncOneParam =(x) => x - 3
const asyncOp:MathFuncOneParamPromise = x => Promise.resolve( x + 100)


const compose:Compose = (...fns) => x =>{
	return fns.reduce(async(acc, fn)=>{ //como é um loop async, sempre retorna uma promise
		const resolve = await acc //sempre resolve ama promise
		return fn(resolve) //retorn um number
	}, Promise.resolve(x)) //já inicia com uma promise, garantindo que o acc inicial seja uma promise
}

const app = compose(add5, double, deduct3, asyncOp)

app(5).then((res)=>console.log(res))