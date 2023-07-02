const isPrime = (x:number)=>{
	let prime = x > 1 ? true : false;
	for(let i = 2; i < x; i++){
		if(x % i === 0){
			prime = false
			break;
		}
	}
	return prime;
}

const array = [1,2,3,4,5,6,7,8,9,10];
const withoutFlatMap = array.filter((num)=>isPrime(num)).map((num)=>num-=1) // podiamos usar um reducer aqui
const withFlatMap = array.flatMap(num=> isPrime(num)? [num -1]:[]);
console.log(`sem flatMap ${withoutFlatMap}`)
console.log(`com flatMap ${withFlatMap}`)