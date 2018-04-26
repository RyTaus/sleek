import { nameToType } from './../type/type';
import Pin from './../models/pin';
import Direction from './../utils/direction';


export const parsePin = (name, data, direction, index) =>
  new Pin(name, nameToType(data), direction, index);

const parseNode = (name, data) => {
  const inPins = {};
  Object.keys(data.in).forEach((key, i) => inPins[key] = parsePin(key, data.in[key], Direction.in, i));
  const outPins = {};
  Object.keys(data.out).forEach((key, i) => outPins[key] = parsePin(key, data.out[key], Direction.out, i));
  return {
    inPins,
    outPins,
    name,
    compile: data.compile,
  };
};

export default parseNode;
