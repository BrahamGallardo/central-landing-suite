import { Base } from "./base";
import { User } from "./user";

export class Role extends Base{
  name: string;
  description?: string;
  users?: User[];
}
