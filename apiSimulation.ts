export const getNumFromApi = (num: number):Promise<number> =>{
	return new Promise((res, rej)=>{
		return setTimeout(()=>{
			if(num > 5){
				return rej('não rolou')
			}
			return res(num)
		}, 300)
	})
	
}