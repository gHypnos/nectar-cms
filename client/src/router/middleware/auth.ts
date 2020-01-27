export default function auth({ next, store }: any) {
  if (!store.Session.getters.isLoggedIn) {
    return next({
      name: 'login'
    })
  }
  return next()
}
