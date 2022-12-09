import 'types.dart';

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
