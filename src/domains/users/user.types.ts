import { z } from "zod";
import {
  sUser,
  sUserPatchBody,
  sUserRegistrationBody,
  sUserValidResponse,
} from "./user.schemas";

type tUser = z.infer<typeof sUser>;
type tUserRegistrationBody = z.infer<typeof sUserRegistrationBody>;
type tUserValidResponse = z.infer<typeof sUserValidResponse>;
type tUserPatchBody = z.infer<typeof sUserPatchBody>;
