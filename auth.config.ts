import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas/index";
import { getUserByEmail } from "@/data/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        // 使用 zod 執行的表單驗證
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          // 從 DB 取得對應的 User 資料
          const user = await getUserByEmail(email);

          // !user?.password -> 使用其他管道登入時，只會有 user 沒有 password，要避免這樣的 credentials 出現在這個登入管道。
          if (!user || !user?.password) return null;

          // 比對當前使用者輸入的 password 與 DB 儲存的 password 是否一致? (因為是加密過的，因此不會暴露密碼的明碼)
          const passwordMatch = await bcrypt.compare(password, user?.password);

          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
