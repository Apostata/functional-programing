# Functional programing

## Category Theory
1. O tipo é exatamente como o vemos em linguagens com tipagem estática. Exemplos: Int, String, Dog, Cat, etc.
2. Funções conectam 2 tipos $f: T \to U$. fução recebe um argumento do tipo $T$ e retorna o tipo $U$

## Pure functions
determinística. Uma saida para uma etrada específica e não alteram estados. se resumem em seu escopo 

## Composition
Composição é uma operação denotada pelo Operador $\cdot$, que constroi novas funções a partir de outras. Em uma categoria é sempre garantido que para qualquer função $f$: $T$ $\to$ $U$ e $g$: $U$ $\to$ $V$, existe uma única função $h$: $T$ $\to$ $V$, denotada como $f$ $\cdot$ $g$
ex(typescript):
```ts
type MathFuncOneParam = (x: number) => number
type MathFuncCompose = (...args:MathFuncOneParam[]) => MathFuncOneParam


const add5:MathFuncOneParam = (x) => x + 5
const double:MathFuncOneParam = (x) => x * 2

const compose:MathFuncCompose = (f1, f2) => (x) => f2(f1(x))

const app = compose(add5, double);
console.log(app(3))
// >> 16
```
ex(dart):
```dart
typedef MathFunctionOneParam = int Function(int);
typedef MathFunctionOneParamCompose = MathFunctionOneParam Function(
    MathFunctionOneParam, MathFunctionOneParam);

MathFunctionOneParam add5 = (x) => x + 5;
MathFunctionOneParam double = (x) => x * 2;

MathFunctionOneParamCompose compose = (fn1, fn2) {
  return (int x) => fn2(fn1(x));
};

void main(List<String> args) {
  final app = compose(add5, double);
  print(app(3));
}
// >> 16

```

podemos ainda criar uma função para compor dinamicamente quantas funções forem passadas:
ex (typescript):
```ts
const add5:MathFuncOneParam = (x) => x + 5
const double:MathFuncOneParam = (x) => x * 2
const deduct3:MathFuncOneParam =(x) => x - 3


const compose2: MathFuncCompose = (...funcs) => (x) => { // recebe um X parametros (usando rest operator)
	return funcs.reduce((acc, func) =>{
		return func(acc)
	}, x)
}

const app2 = compose2(add5, double, deduct3)

console.log(app2(5))
// >> 17
```

ex(dart):
```dart
typedef MathFunctionOneParam = int Function(int);
typedef MathFunctionOneParamComposeList = MathFunctionOneParam Function(
    List<MathFunctionOneParam>);

MathFunctionOneParam add5 = (x) => x + 5;
MathFunctionOneParam double = (x) => x * 2;
MathFunctionOneParam deduct3 = (x) => x - 3;

MathFunctionOneParamComposeList compose = (funcs) {
  return (int x) => funcs.fold(x, (acc, fn) => acc = fn(acc));
};

void main(List<String> args) {
  final app = compose([add5, double, deduct3]);
  print(app(5));
}
```

## Monad
Uma Monad é uma interface abstrata que define funções "puras" e "flatMap". Pure permite converter um valor comum em valor monádico. FlatMap permite que funções com argumentos comuns sejam aplicadas a argumentos monádicos.

Uma mônada é uma maneira de compor funções que requerem contexto além do valor de retorno, como computação, ramificação ou I/O. O tipo de mônadas eleva, nivela e mapeia para que os tipos se alinhem para as funções de elevação $a$ $\to$ $M(b)$, tornando-os combináveis. É um mapeamento de algum tipo a para algum tipo b junto com algum contexto computacional, oculto nos detalhes de implementação de lift, flatten e map

1. **Map** significa "aplicar uma função a um $a$ e retornar um $b$". Dada alguma entrada, retorne alguma saída.
2. **Contexto** é o detalhe computacional da composição da mônada (incluindo levantamento, nivelamento e mapa). A API Functor/Monad e seu funcionamento fornecem o contexto que permite compor a mônada com o restante do aplicativo. O objetivo dos functors e mônadas é abstrair esse contexto para que não tenhamos que nos preocupar com isso enquanto compomos as coisas. Mapear dentro do contexto significa que você aplica uma função de $a$ $\to$ $b$ ao valor dentro do contexto e retorna um novo valor b dentro do mesmo tipo de contexto. Observáveis ​​à esquerda? Observables à direita: `Observable(a) => Observable(b)`. Arrays no lado esquerdo? Arrays do lado direito: `Array(a) => Array(b)`
3. **Type Lift** significa elevar um tipo para um contexto, abençoando o valor com uma API que você pode usar para calcular a partir desse valor, disparar cálculos contextuais, etc… a => F(a) (Monads são um tipo de functor).

### para que servem?
As Monads são usadas extensivamente na programação funcional. Seu principal objetivo é isolar quaisquer efeitos colaterais não confiáveis ​​e perigosos em um só lugar, para que você possa desfrutar de uma programação segura em todas as outras partes do aplicativo.

### O que são categorias monádicas
Tecnicamente, uma mônada é um endofuntor, o que significa que é algo que mapeia uma categoria para si mesmo. Mas você pode pensar em uma imagem desse functor como uma nova categoria com efeitos colaterais monádicos.

### Oque é programação monádicas
A programação monádica é uma técnica de composição de diferentes valores monádicos em uma grande mônada. Depois disso é fácil processar todos os efeitos colaterais, porque eles estão concentrados em apenas uma mônada, ao invés de muitas mônadas.

Vamos chamar o comportamento instável como I/O de efeito colateral. Agora queremos poder trabalhar com todas as nossas funções definidas anteriormente, como `length` e tipos como `String`, de maneira estável na presença desse efeito colateral. Então, vamos começar com uma categoria vazia $M[A]$ e transformá-lo em uma categoria que terá valores com um determinado tipo de efeito colateral e também valores sem efeitos colaterais. Vamos supor que definimos esta categoria e ela está vazia. No momento, não há nada de útil que possamos fazer com ele, portanto, para torná-lo útil, seguiremos estas três etapas:

1. O primeiro é chamado *pure* e é definido para cada valor de uma categoria estável: *pure* : $T$ $\to$ $M[T]$. O resultado $M[T]$ não terão nenhum efeito colateral, portanto, essa função é chamada *pure*. Por exemplo, para uma mônada de I/O,*pure* retornará algum valor imediatamente sem possibilidade de falha.
2. O segundo é chamado construtor e, ao contrário *pure*, retorna $M[T]$ com alguns efeitos colaterais. Um exemplo de tal construtor para uma mônada de I/O assíncrona pode ser uma função que busca alguns dados da Web e os retorna como uma String. O valor retornado por construtor terá tipo $M[String]$ neste caso.



![Monadic Composition diagram sample](assets/monadic.webp "Monadic Composition diagram sample")
*Imagem retirada do das fontes descritas no final do documento(Todos direitos preservados)*

**Fontes**
* [Intro to Monadic Composition in Functional Programming](https://www.youtube.com/watch?v=dqzuVhQ85Sk) by [Bitovi](https://www.youtube.com/@Bitovi)
* [Option/Maybe, Either, and Future Monads in JavaScript, Python, Ruby, Swift, and Scala](https://www.toptal.com/javascript/option-maybe-either-future-monads-js) by [Alexey Karasev](https://github.com/alexeuler)