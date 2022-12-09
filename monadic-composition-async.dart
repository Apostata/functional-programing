import 'dart:async';
import 'types.dart';

MathFunctionOneParamFutureOr add5 = (x) => x + 5;
MathFunctionOneParamFutureOr double = (x) => x * 2;
MathFunctionOneParamFutureOr deduct3 = (x) => x - 3;

MathFunctionOneParamFuture asycOp = (x) async {
  Completer<int> c = new Completer();
  c.complete(x + 100);
  return c.future;
};

final typeToFutureType = <T>(T x) async {
  Completer<T> c = new Completer();
  c.complete(x);
  return c.future;
};

final MathFunctionOneParamComposeListMapFuture compose = (fns) => (x) async {
      return fns.fold(typeToFutureType<int>(x), (acc, fn) async {
        final int iX = await acc;
        return fn(iX);
      });
    };

void main(List<String> args) {
  final app = compose([add5, double, deduct3, asycOp]);
  (app(5) as Future<int>).then((value) => print(value));
}
