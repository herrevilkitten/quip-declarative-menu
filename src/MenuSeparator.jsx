export default class MenuSeparator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }
  render() {
    return null;
  }

  toQuipMenu() {
    return {
      id: quip.apps.DocumentMenuCommands.SEPARATOR,
    };
  }
}
