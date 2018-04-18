export default {
  start: {
    in: {
    },
    out: {
      next: 'flow',
    },
    compile: '',
  },
  print: {
    in: {
      ' ': 'flow',
      value: 'string',
    },
    out: {
      next: 'flow',
    },
    compile: 'console.log({value})',
  },
  if: {
    in: {
      ' ': 'flow',
      condition: 'boolean',
    },
    out: {
      true: 'flow',
      false: 'flow',
    },
    compile: 'if ({condition}) { {true} } else { {false} }',
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
    compile: 'while ({condition}) { {body} }',
  },
  break: {
    in: {
      ' ': 'flow',
    },
    out: {
    },
    compile: 'break',
  },
};
