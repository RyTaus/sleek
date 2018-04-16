import { nameToType } from './../type/type';
import Pin from './../components/pin';
import Node from './../components/node';


const parsePin = (name, data) => {
  console.log('DATA:  ', data);
  console.log('NTT:   ', nameToType(data));
  return new Pin({ type: nameToType(data) });
};

const parseNode = (name, data) => {
  const inPins = {};
  Object.keys(data.in).forEach(key => inPins[key] = parsePin(key, data.in[key]));
  const outPins = {};
  Object.keys(data.out).forEach(key => outPins[key] = parsePin(key, data.out[key]));
  return {
    inPins,
    outPins,
    name,
    compile: data.compile,
  };
};

export default parseNode;
