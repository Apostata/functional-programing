const right = (v) => ({
	map: (f) => right(f(v)),
	matchWith: (pattern) => pattern.right(v),
  });
 
  const left = (v) => ({
	map: () => left(v),
	matchWith: (pattern) => pattern.left(v),
  });
 
 
  var Try = (f) => {
	try {
	  var result = f();
	  return right(result);
	} catch (e) {
	  return left(e);
	}
  }
 
 Try(()=> 3/4)
 .map(x=>`the computation result is :${x}`)
 .matchWith({
	right: v => console.log(v),
	left: v => console.log("error : " + v)
  })
  
//  Try(()=> 3/e)
//  .map(x=>`the computation result is :${x}`)
//  .matchWith({
// 	right: v => console.log(v),
// 	left: v => console.log("error : " + v)
//   })
 
