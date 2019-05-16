import { updateMenu } from './MenuUtils';

export default class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }
  render() {
    return <div>{this.props.children}</div>;
  }

  componentDidMount() {
    console.log('MenuBar mounted', this.props);
    updateMenu(this);
  }

  componentDidUpdate() {
    console.log('MenuBar updated', this.props);
    updateMenu(this);
  }
}
