
export const USER = "@document/user"
export const TOKEN_USER = "@document/token"

export const isAuthenticated = () => localStorage.getItem(TOKEN_USER) !== null

export const setUser = user => localStorage.setItem(USER, user)

export const getUser = () =>  localStorage.getItem(USER)

export const getToken = () => localStorage.getItem(TOKEN_USER)

export const setToken = token => {
  localStorage.setItem(TOKEN_USER, token)
}

export const logout = () => {
  localStorage.removeItem(TOKEN_USER)
}
