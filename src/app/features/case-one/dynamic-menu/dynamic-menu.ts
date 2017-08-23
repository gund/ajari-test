export type DynamicMenu = DynamicMenuItem[];

export interface DynamicMenuItem {
  name: string;
  link?: string;
  children?: DynamicMenu;
}
