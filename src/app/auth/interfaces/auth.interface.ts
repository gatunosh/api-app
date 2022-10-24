export interface AuthResponse {
    id?: number,
    token?:string,
    first_name?: string,
    last_name?: string,
    msg?: string
  }

export interface User {
  id?: number,
  first_name: string,
  last_name: string,
  vat?:string,
  email?:string,
  password?: string
}