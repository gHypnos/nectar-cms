
export default function guest({ next, store }: any) {
  if (store.Session.getters.isLoggedIn) {
    return next({ name: 'Home' })
  } return next()
}
