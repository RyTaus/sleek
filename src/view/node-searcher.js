const d3 = require('d3');

const Component = require('./component.js');
const pb = require('./../prebuilt-nodes.js');

// Need to update a bit
class NodeSearcher extends Component {
  constructor(canvas) {
    super(canvas, false);
    this.canvas = canvas;

    this.transform = {
      x: 0,
      y: 0,
      width: 200,
      height: 150
    };

    this.active = false;
    this.createSvgNodeSearcher();
    this.initialize();
  }

  seed(pin) {
    this.currentSeed = pin;
  }

  setPosition(mouse) {
    [this.transform.x, this.transform.y] = mouse;
    return this;
  }

  remove() {
    this.svg.selectAll('.search-result-label').remove();
    this.svg.selectAll('.search-result').remove();
    this.active = false;
    this.render();
    return this;
  }

  initialize() {
    super.initialize();
  }

  getPossibleNodes() {
    const objectToArray = (obj) => {
      return Object.entries(obj).map((o) => {
        return o[1];
      });
    };
    let possible = objectToArray(pb);
    if (this.currentSeed) {
      possible = possible.filter((Obj) => {
        const test = new Obj(this.transform.x, this.transform.y);
        if (this.currentSeed.direction === 'out') {
          return test.inPins.some(p => this.currentSeed.canConnect(p));
        }
        return test.outPins.some(p => this.currentSeed.canConnect(p));
      });
    }
    return possible;
  }

  render() {
    if (this.active) {
      const possible = this.getPossibleNodes();
      this.getNode()
        .data([this])
        .attr('width', d => d.transform.width)
        .attr('height', d => d.transform.height)
        .attr('x', d => d.transform.x)
        .attr('y', d => d.transform.y)
        .classed('search-bg', true)
        .moveToFront();

      this.getNode('search')
        .data([this])
        .attr('width', d => d.transform.width - 10)
        .attr('height', 20)
        .attr('x', d => d.transform.x + 5)
        .attr('y', d => d.transform.y + 5)
        .classed('search-search', true)
        .moveToFront();

      this.getNode('results')
        .data([this])
        .attr('width', d => d.transform.width - 10)
        .attr('height', this.transform.height - 35)
        .attr('x', d => d.transform.x + 5)
        .attr('y', d => d.transform.y + 30)
        .classed('search-body', true)
        .moveToFront();

      this.svg.selectAll('.search-result')
        .data(possible)
        .enter()
        .append('rect')
        .attr('width', this.transform.width - 20)
        .attr('height', 20)
        .attr('x', this.transform.x + 10)
        .attr('y', (d, i) => ((this.transform.y + 35) + (i * 25)))
        .classed('search-result', true)
        .moveToFront()
        .on('mousedown', () => {
          d3.event.stopPropagation();
        })
        .on('mouseup', (d) => {
          const newNode = new d(this.transform.x, this.transform.y, this.svg);
          this.canvas.addNode(newNode);

          if (this.currentSeed) {
            let connectable = [];
            if (this.currentSeed.direction === 'out') {
              connectable = newNode.inPins.filter(p => this.currentSeed.canConnect(p));
            } else {
              connectable = newNode.outPins.filter(p => this.currentSeed.canConnect(p));
            }
            if (connectable.length === 1) {
              connectable[0].connect(this.currentSeed);
              this.currentSeed.view.render();
              newNode.view.render();
            }
          }


          this.remove();
          d3.event.stopPropagation();
        });

      this.svg.selectAll('.search-result-label')
        .data(possible)
        .enter()
        .append('text')
        .moveToFront()
        .attr('width', this.transform.width - 20)
        .attr('height', 20)
        .attr('x', this.transform.x + 10)
        .attr('y', (d, i) => ((this.transform.y + 45) + (i * 25)))
        .text(d => d.name)
        .classed('search-result-label', true);
    } else {
      this.getNode()
        .attr('width', 0)
        .attr('height', 0)
        .attr('x', 0)
        .attr('y', 0);

      this.getNode('search')
        .attr('width', 0)
        .attr('height', 0)
        .attr('x', 0)
        .attr('y', 0);

      this.getNode('results')
        .attr('width', 0)
        .attr('height', 0)
        .attr('x', 0)
        .attr('y', 0);
    }
    return this;
  }
}

module.exports = NodeSearcher;
