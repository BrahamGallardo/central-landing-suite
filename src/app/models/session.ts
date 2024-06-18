import { Base } from "./base";
import { User } from "./user";

export class Session extends Base {
  userId: number;
  active?: boolean;
  token?: string;
  user: User;
}
