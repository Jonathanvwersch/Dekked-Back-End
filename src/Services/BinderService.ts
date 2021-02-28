import BinderModel from '../Persistance/BinderModel';

export function createBinderObject(binders: BinderInterface[]) {
  let binderObject: { [key: string]: BinderInterface } = {};
  binders.forEach((val) => {
    binderObject[val.id] = val;
  });

  return binderObject;
}

async function updateBinder({
  color,
  name,
  binder_id,
  owner_id
}: {
  color?: string;
  name?: string;
  binder_id: string;
  owner_id: string;
}) {
  await BinderModel.updateBinder({ color, name, binder_id, owner_id });
}
export default {
  createBinderObject,
  updateBinder
};
