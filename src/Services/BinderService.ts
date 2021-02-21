export function createBinderObject(binders: BinderInterface[]) {
  let binderObject: { [key: string]: BinderInterface } = {};
  binders.forEach((val) => {
    binderObject[val.id] = val;
  });

  return binderObject;
}
