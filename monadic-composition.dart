import 'types.dart';

MathFunctionOneParamReturnMap add5 = (x) => {x + 5: '+ 5'};
MathFunctionOneParamReturnMap double = (x) => {x * 2: '* 2'};
MathFunctionOneParamReturnMap subtract3 = (x) => {x - 3: '- 3'};

final MathFunctionOneParamComposeListMap compose = (funcs) {
  return (int x) => funcs.fold({x: 'x'}, (acc, fn) {
        final entry = acc.entries.first;
        final res = fn(entry.key);
        final newEntry = res.entries.first;
        return {newEntry.key: '${entry.value} ${newEntry.value}'};
      });
};

void main(List<String> args) {
  final app = compose([add5, double, subtract3]);
  print(app(5));
}
