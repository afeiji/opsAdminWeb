const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  // 用户名字段是根据username，而不是name
  name: state => state.user.username,
  roles: state => state.user.roles,
  // 展示权限
  permission: state => state.user.permission
}
export default getters
