export interface NavItem {
  to: string;
  label: string;
  icon?: React.ReactNode;
  isActive?: any;
}

export interface IPropsSideNav {
  data: NavItem[];
}

export interface IPropsSideNavItem extends NavItem {
  isCollapsed: boolean;
}
