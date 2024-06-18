import { Base } from "./base";
import { Role } from "./role";

export class User extends Base {
  name: string;
  lastName?: string;
  roleId: number;
  email: string;
  password?: string;
  role: Role;
}
