import { z } from 'zod';

const User = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default User;
