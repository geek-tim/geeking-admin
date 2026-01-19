import { auths } from './auths'
import { users } from './users'
import { menus } from './menus'
import { tests } from './tests'

export const handlers = [...auths, ...users, ...menus, ...tests]
