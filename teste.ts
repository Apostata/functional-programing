import { getNumFromApi } from "./apiSimulation";

const getNum = async() =>{
	const map :{Right:number,Left:string }= {} as  {Right:number,Left:string }
	try{
		const res =  await getNumFromApi(3)
		map.Right = res
		return map
	} catch(e){
		map.Left = (e as string)
		return map
	}
}

const EitherGetNum = async ()=>{
	const res = await getNum();
	console.log(res)
}
EitherGetNum()