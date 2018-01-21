class Person {
  constructor(name) {
    this.firstName = name;
  }

  sayName() {
    console.log(this.firstName);
  }
}

class Player extends Person {
  constructor(name, number, position) {
    super(name);
    this.number = number;
    this.position = position;
  }

  win(enemy, score) {
    console.log(true);
  }
}

Object.getPropsByDepth = (object) => {
  const results = {};
  const getProps = (obj) => {
    if (obj === null) {
      return
    }
    results[obj.constructor.name] = Object.getOwnPropertyNames(obj);
    // console.log(obj);

    getProps(Object.getPrototypeOf(obj));
  }
  results['this'] = Object.keys(object);
  getProps(Object.getPrototypeOf(object));

  return results;
}

let matt = new Player('matt', 10, 'PF');
console.log(Object.getPropsByDepth(matt));
// console.log(Object.getPropsByDepth({a: 'ok', b: 'cmon'}));
