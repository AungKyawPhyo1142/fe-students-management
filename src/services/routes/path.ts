// these are the routes that are used in the application
export const AppConstantRoutes = {
  paths: {
    get auth() {
      return {
        get default() {
          return '/auth'
        },
        get login() {
          return `${this.default}/login`
        },
        get register(){
          return `${this.default}/register`
        }
      }
    },
    get admin() {
      return {
        get default() {
          return '/admin'
        },
        get home() {
          return `${this.default}/home`
        },
      }
    },
  },
}
