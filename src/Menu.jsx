export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }
  render() {
    return null;//<div>{this.props.children}</div>;
  }

  componentDidUpdate() {
    console.log('Menu updated', this.props);
  }
}
