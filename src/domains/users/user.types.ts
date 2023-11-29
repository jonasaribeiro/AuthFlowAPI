import { z } from "zod";
import {
  sUser,
  sUserPatchBody,
  sUserRegistrationBody,
  sUserValidResponse,
} from "./user.schemas";

export type tUser = z.infer<typeof sUser>;
export type tUserRegistrationBody = z.infer<typeof sUserRegistrationBody>;
export type tUserValidResponse = z.infer<typeof sUserValidResponse>;
export type tUserPatchBody = z.infer<typeof sUserPatchBody>;
