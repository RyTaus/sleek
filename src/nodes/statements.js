export default {
  if: {
    in: {
      ' ': 'flow',
      condition: 'boolean',
    },
    out: {
      true: 'flow',
      false: 'flow',
      then: 'flow',
    },
    compile: 'if ({i1}) { {o1} } else { {o2} } \n {o3}',
  },
  start: {
    in: {},
    out: {
      next: 'flow',
    },
    compile: '{o1}',
  },
};
