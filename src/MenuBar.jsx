import { updateMenu } from './MenuUtils';

import Menu from './Menu.jsx';
import MainMenu from './MainMenu.jsx';
import MenuSeparator from './MenuSeparator.jsx';

export default class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    return null;
  }

  componentDidMount() {
    updateMenu(this);
  }

  componentDidUpdate() {
    updateMenu(this);
  }

  toQuipMenu() {
    let children = this.props.children;
    if (!Array.isArray(children)) {
      children = [children];
    }

    let menus = [];

    const mainMenus = children
      .filter(child => child.type === MainMenu)
      .map(child => child.type.prototype.toQuipMenu.call(child));
    if (mainMenus.length > 0) {
      menus.push(mainMenus[0]);
      if (mainMenus.length > 1) {
        for (let i = 1; i < mainMenus.length; ++i) {
          menus[0].submenus.push(...mainMenus[i].submenus);
        }
      }
    }

    menus.push(...children
      .filter(child => child.type === Menu || child.type === MenuSeparator)
      .map(child => child.type.prototype.toQuipMenu.call(child)));

    return menus;
  }
}
