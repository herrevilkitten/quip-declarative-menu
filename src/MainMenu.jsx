export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }
  render() {
    return <div>{this.props.children}</div>;
  }

  componentDidUpdate() {
    console.log('MainMenu updated', this.props);
  }
}
