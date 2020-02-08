// eslint-disable-next-line import/no-unresolved,import/extensions
import * as roles from '<%=options.pkg.name%>/api/roles';

export default function ({ app }) {
  const rolesKeys = {
    ...Object.keys(roles)
      .map((r) => ({ [r]: r }))
      .reduce((acc, r) => Object.assign(acc, r), {}),
  };

  Object.assign(app.$auth, {
    hasRole(role, campus) {
      if (!this.user || !this.user.roles) {
        return false;
      }

      return this.user.roles.find(
        (rule) => roles[rule.role]
          .find((currentRole) => role === currentRole)
            && (!campus || rule.campuses.find((currentCampus) => currentCampus.id === campus)),
      );
    },
    isRegulator(...params) {
      return this.hasRole(rolesKeys.ROLE_REGULATOR, ...params);
    },
    isAdmin(...params) {
      return this.hasRole(rolesKeys.ROLE_ADMIN, ...params);
    },
    isSuperAdmin(...params) {
      return this.hasRole(rolesKeys.ROLE_SUPERADMIN, ...params);
    },
  });
}
