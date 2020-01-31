import { DateTime } from 'luxon';

export default function ({
  app: {
    $auth, $toast, router,
  },
}) {
  const warn = (user) => {
    if (user && user.passwordExpiration) {
      const expirationDate = DateTime.fromISO(user.passwordExpiration);
      if (new Date() > expirationDate.minus({ months: 1 }).toJSDate()) {
        $toast.info(
          `Votre compte expire le ${
            expirationDate.toLocaleString(DateTime.DATETIME_MED)
          }, après cette date vous n'aurez plus accès à l'application.`,
          {
            action: {
              text: 'Changer le mot de passe',
              onClick: () => router.push('<%=options.accountRoute%>'),
            },
          },
        );
      }
    }
  };
  warn($auth.$storage.getUniversal('user'));
  $auth.$storage.watchState('user', warn);
}
