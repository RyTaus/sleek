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
    compile: 'if ({i1}) { {o0} } else { {o1} }',
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
  print: {
    in: {
      ' ': 'flow',
      value: 'string',
    },
    out: {
      next: 'flow',
    },
    compile: 'console.log({i1})',
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
    compile: '',
  },
};
