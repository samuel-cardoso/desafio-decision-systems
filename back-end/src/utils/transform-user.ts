import { decrypt } from "./crypto";

export function transformUser(users: any) {
  return {
    ...users,
    birthData: users.birth_data.toISOString(),
    motherName: decrypt(users.mother_name),
  };
}
