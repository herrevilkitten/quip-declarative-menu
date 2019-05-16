import MenuSeparator from './MenuSeparator.jsx';

let assignedMenuId = 0;

export const KEYS = [
  'id',
  'label',
  'sublabel',
  'handler',
  'isHeader',
  'actionParams',
  'actionStarted',
  'highlighted',
  'disabled',
];

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    return null;
  }

  toQuipMenu() {
    const menu = {};

    KEYS.forEach((key) => {
      if (this.props[key] !== undefined && this.props[key] !== null) {
        menu[key] = this.props[key];
      }
    });

    if (!menu.id) {
      menu.id = `generated-menu-${assignedMenuId}`;
      assignedMenuId++;
    }

    let children = this.props.children;
    if (children) {
      if (!Array.isArray(children)) {
        children = [children];
      }

      menu.submenus = children
        .filter(child => child.type === Menu || child.type === MenuSeparator)
        .map(child => child.type.prototype.toQuipMenu.call(child));
    }
    return menu;
  }
}
