export default {
  if: {
    in: {
      ' ': 'flow',
      condition: 'boolean',
    },
    out: {
      true: 'flow',
      false: 'flow',
    },
    compile: 'if ({i1}) { {o1} } else { {o2} } \n {o3}',
  },
  while: {
    in: {
      ' ': 'flow',
      condition: 'boolean',
    },
    out: {
      body: 'flow',
      then: 'flow',
    },
    compile: 'while ({i1}) { {o1} }',
  },
  break: {
    in: {
      ' ': 'flow',
    },
    out: {
    },
    compile: 'break',
  },
  start: {
    in: {},
    out: {
      next: 'flow',
    },
    compile: '{o1}',
  },
};
