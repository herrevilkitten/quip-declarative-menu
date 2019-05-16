import Menu from './Menu.jsx';
import MainMenu from './MainMenu.jsx';

let assignedMenuId = 0;

function componentToMenu(component) {
  let { id, label, highlighted, disabled, handler } = component.props;

  if (!id) {
    id = `generated-menu-${assignedMenuId}`;
    assignedMenuId++;
  }

  const menu = {
    id: id,
  };

  if (label) {
    menu.label = label;
  }

  if (highlighted) {
    menu.highlighted = highlighted;
  }

  if (disabled) {
    menu.disabled = disabled;
  }

  if (handler) {
    menu.handler = handler;
  }

  let children = component.props.children;
  if (children) {
    if (!Array.isArray(children)) {
      children = [children];
    }

    console.log('children:', children);
    menu.submenus = children.filter(child => child.type === Menu).map(componentToMenu);
  }
  return menu;
}

function processMainMenu(component) {
  let children = component.props.children;
  if (!Array.isArray(children)) {
    children = [children];
  }

  let submenus = [];

  if (children) {
    submenus = children.filter(child => child.type === Menu).map(child => componentToMenu(child));
  } else {
    submenus = [];
  }

  return {
    id: quip.apps.DocumentMenuCommands.MENU_MAIN,
    submenus
  };
}

function processMenuStructure(parent, menu) {
  const newEntry = {
    id: parent.id
  };

  if (parent.label) {
    newEntry.label = parent.label;
  }

  if (parent.handler) {
    newEntry.handler = parent.handler;
  }

  if (parent.submenus) {
    newEntry.subCommands = parent.submenus.map(menu => menu.id);
    parent.submenus.forEach((child) => {
      processMenuStructure(child, menu);
    })
  }

  if (!newEntry.handler && !newEntry.subCommands) {
    newEntry.isHeader = true;
  }

  menu.menuCommands.push(newEntry);

  if (parent.highlighted) {
    menu.highlightedCommandIds.push(newEntry.id);
  }

  if (parent.disabled) {
    menu.disabledCommandIds.push(newEntry.id);
  }
}

function buildMenuFromStructure(menus) {
  const toolbarCommandIds = [];
  const menu = {
    menuCommands: [],
    disabledCommandIds: [],
    highlightedCommandIds: [],
  };

  if (menus.length) {
    toolbarCommandIds.push(...menus.map(menu => menu.id));
  }

  menus.forEach((parent) => {
    processMenuStructure(parent, menu);
  });

  return {
    toolbarCommandIds,
    ...menu
  };
}

export function updateMenu(menuBar) {
  const mainMenu = [];
  const toolbarMenu = [];
  console.log(menuBar);

  console.log('Time to build the menu!');

  let children = menuBar.props.children;
  if (!Array.isArray(children)) {
    children = [children];
  }

  children.forEach((child) => {
    const type = child.type;
    if (type === MainMenu) {
      toolbarMenu.push(processMainMenu(child));
    } else {
      toolbarMenu.push(componentToMenu(child));
    }
  });

  console.log("Main Menu:", mainMenu);
  console.log("Toolbar Menu:", toolbarMenu);

  let menu = buildMenuFromStructure(toolbarMenu);
  console.log('Menu configuration:', menu);
  quip.apps.updateToolbar(menu);
}
