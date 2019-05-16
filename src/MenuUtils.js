import { KEYS } from './Menu.jsx';

function processMenuStructure(parent, menu) {
  const newEntry = {
  };

  KEYS.forEach((key) => {
    if (parent[key] !== undefined && parent[key] !== null) {
      newEntry[key] = parent[key];
    }
  })

  if (parent.submenus) {
    newEntry.subCommands = parent.submenus.map(menu => menu.id);
    parent.submenus.forEach((child) => {
      processMenuStructure(child, menu);
    })
  }

  if (!newEntry.handler && !newEntry.subCommands) {
    newEntry.isHeader = true;
  }

  if (newEntry.id !== quip.apps.DocumentMenuCommands.SEPARATOR) {
    menu.menuCommands.push(newEntry);
  }

  if (newEntry.highlighted) {
    menu.highlightedCommandIds.push(newEntry.id);
  }

  if (newEntry.disabled) {
    menu.disabledCommandIds.push(newEntry.id);
  }

  delete newEntry.disabled;
  delete newEntry.highlighted;
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
  const menus = menuBar.toQuipMenu();
  console.log({ menus });
  const config = buildMenuFromStructure(menus);

  console.log(config);
  console.log(JSON.stringify(config));

  quip.apps.updateToolbar(config);
}
