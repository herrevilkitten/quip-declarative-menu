import Menu from './Menu.jsx';
import MenuSeparator from './MenuSeparator.jsx';

export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }
  render() {
    return null;
  }

  toQuipMenu() {
    let children = this.props.children;
    if (!Array.isArray(children)) {
      children = [children];
    }

    let submenus = [];

    if (children) {
      console.log('MainMenu', children);
      submenus = children
        .filter(child => child.type === Menu || child.type === MenuSeparator)
        .map(child => child.type.prototype.toQuipMenu.call(child));
    } else {
      submenus = [];
    }

    return {
      type: 'main-menu',
      id: quip.apps.DocumentMenuCommands.MENU_MAIN,
      submenus
    };
  }
}
