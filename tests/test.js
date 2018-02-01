const { describe, it } = require('mocha');
const assert = require('assert');

const Pin = require('./../src/visual/pin.js');

const Direction = Pin.Pin.Direction;


describe('Pin', () => {

  const createTestPins = () => {
    const A = new Pin.Value();
    const B = new Pin.Value();
    const C = new Pin.Value();
    const D = new Pin.Flow();
    const E = new Pin.Flow();
    const F = new Pin.Flow();
    const G = new Pin.Input();
    const H = new Pin.Input();

    A.direction = Direction.IN;
    B.direction = Direction.IN;
    C.direction = Direction.OUT;
    D.direction = Direction.IN;
    E.direction = Direction.OUT;
    F.direction = Direction.OUT;
    G.direction = Direction.IN;
    H.direction = Direction.IN;

    return {
      A, B, C, D, E, F, G, H
    };
  };

  describe('constructor', () => {
    it('should generate correct objects', () => {
      const { A, D, H } = createTestPins();
      assert.equal(A.type, Pin.Pin.Type.VAL);
      assert.equal(D.type, Pin.Pin.Type.FLOW);
      assert.equal(H.type, Pin.Pin.Type.INPUT);
    });
  });

  describe('connection', () => {
    it('should connect viable pins', () => {
      const {
        A, B, C, D, E, F
      } = createTestPins();
      assert.ok(A.connect(C));
      assert.ok(B.connect(C));
      assert.ok(D.connect(E));
      assert.ok(F.connect(D));
      assert.equal(E.connection, null);
    });
    it('should throw errors for invalid inputs', () => {
      const {
        A, B, E, F
      } = createTestPins();
      assert.throws(() => { B.connect(A); }, /cannot match pin directions in and in/);
      assert.throws(() => { E.connect(F); }, /cannot match pin directions out and out/);
      assert.throws(() => { A.connect(E); }, /cannot match pin types val:in with flow:out/);
    });
  });
});
