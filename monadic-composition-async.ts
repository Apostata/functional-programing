import { MathFuncOneParam , MathFuncCompose, MathFuncOneParamPromise, Compose} from "./types"

const add5:MathFuncOneParam = (x) => x + 5
const double:MathFuncOneParam = (x) =>x * 2
const deduct3:MathFuncOneParam =(x) => x - 3
const asyncOp:MathFuncOneParamPromise = x => Promise.resolve( x + 100)

const compose:Compose = (...fns) => x =>{
	return fns.reduce(async(accP, fn)=>{
		return accP.then((acc:number )=> fn(acc))
	}, Promise.resolve(x))
}

const app = compose(add5, double, deduct3, asyncOp)

app(4).then((res)=>console.log(res))