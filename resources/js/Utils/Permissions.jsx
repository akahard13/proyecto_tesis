export function can(permission, permissions) {
  return permissions.some(p => p.permission_name === permission);
}