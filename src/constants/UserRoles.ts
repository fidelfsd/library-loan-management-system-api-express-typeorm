import { Role } from "../models/Role";

export const UserRoles = Object.freeze({
   ADMIN: { id: 1, name: "admin" } as Role,
   MANAGER: { id: 2, name: "manager" } as Role,
   USER: { id: 3, name: "user" } as Role,
});
