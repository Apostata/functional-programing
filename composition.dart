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
