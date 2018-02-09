const Component = require('./component.js');

const pb = require('./../prebuilt-nodes.js');

class NodeSearcher extends Component {
  constructor(canvas) {
    console.log('making ns');
    super(canvas.svg);
    this.canvas = canvas;

    this.transform = {
      x: 0,
      y: 0,
      width: 200,
      height: 150
    };

    this.active = false;
    this.createSvgNodeSearcher();
  }

  setPosition(mouse) {
    [this.transform.x, this.transform.y] = mouse;
    return this;
  }

  remove() {
    console.log('REMOVE THIS');
    this.svg.selectAll('.search-result-label').remove();
    this.svg.selectAll('.search-result').remove();
    this.active = false;
    this.render();
    return this;
  }

  getPossibleNodes() {
    const objectToArray = (obj) => {
      return Object.entries(obj).map((o, i) => {
        const temp = {};
        temp.node = o[1];
        temp.index = i;
        return temp;
      });
    };
    this.dontlintmebro = true;
    return objectToArray(pb);
  }

  render() {
    if (this.active) {
      console.log('rendering');
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
        .data(this.getPossibleNodes())
        .enter()
        .append('rect')
        .attr('width', this.transform.width - 20)
        .attr('height', 20)
        .attr('x', this.transform.x + 10)
        .attr('y', d => ((this.transform.y + 35) + (d.index * 25)))
        .classed('search-result', true)
        .on('click', (d) => {
          console.log(d);
          console.log(this);
          const newNode = new d.node(this.transform.x, this.transform.y, this.svg);
          this.canvas.addNode(0, newNode);
          newNode.render();
          this.remove();
        });

      this.svg.selectAll('.search-result-label')
        .data(this.getPossibleNodes())
        .enter()
        .append('text')
        .attr('width', this.transform.width - 20)
        .attr('height', 20)
        .attr('x', this.transform.x + 10)
        .attr('y', d => ((this.transform.y + 45) + (d.index * 25)))
        .text(d => d.node.name)
        .classed('search-result-label', true);


    } else {
      this.getNode()
        .attr('width', 0)
        .attr('height', 0)
        .attr('x',0)
        .attr('y', 0)

      this.getNode('search')
        .attr('width', 0)
        .attr('height', 0)
        .attr('x',0)
        .attr('y', 0)

      this.getNode('results')
        .attr('width', 0)
        .attr('height', 0)
        .attr('x', 0)
        .attr('y', 0)
    }
    return this;
  }
}

module.exports = NodeSearcher;
