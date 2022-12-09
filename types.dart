import 'dart:async';

typedef MathFunctionOneParam = int Function(int);
typedef MathFunctionOneParamCompose = MathFunctionOneParam Function(
    MathFunctionOneParam, MathFunctionOneParam);
typedef MathFunctionOneParamComposeList = MathFunctionOneParam Function(
    List<MathFunctionOneParam>);
typedef MathFunctionOneParamFuture = Future<int> Function(int);

typedef MathFunctionOneParamFutureOr = FutureOr<int> Function(int);

typedef MathFunctionOneParamReturnMap = Map<int, String> Function(int);
typedef MathFunctionOneParamComposeListMap = MathFunctionOneParamReturnMap
    Function(List<MathFunctionOneParamReturnMap>);
typedef MathFunctionOneParamComposeListMapFuture = MathFunctionOneParamFutureOr
    Function(List<MathFunctionOneParamFutureOr>);
