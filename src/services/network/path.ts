export const ApiConstantRoutes = {
  paths: {
    get auth() {
      return {
        get default() {
          return '/v1/auth'
        },
        get login() {
          return `${this.default}/login`
        },
      }
    },
  },
}
