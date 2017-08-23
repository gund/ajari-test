export interface Role {
  id: number;
  name: string;
  permissions: Permissions;
}

export interface Permissions {
  canAccess: boolean;
  canModify: boolean;
}
