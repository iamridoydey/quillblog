import { GenerateTokenPayload } from "@/app/interfaces/user";
import jwt from "jsonwebtoken";

export async function generateToken(payload: GenerateTokenPayload) {
  const SECRET_KEY = "pritedeyquillblog";
  const option = { expiresIn: "1h" };

  return jwt.sign(payload, SECRET_KEY, option);
}
