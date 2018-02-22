const sizes = {
  pin: {
    width: 10,
    border: 5
  }
};
sizes.node = {
  width: 150,
  heightPerPin: sizes.pin.width + sizes.pin.border,
  labelHeight: 20,
  margin: 10
};
module.exports = sizes;
