import { z } from 'zod';

// Define your environment variable schema
const Environments = z.object({
  VITE_API_BASE_URL: z.string({
    required_error: 'API_BASE_URL is required!',
    invalid_type_error: 'Must be a string!',
  }),
  NODE_ENV: z
    .enum(['development', 'staging', 'production'])
    .default('development'),
});

// Parse the environment variables
export type Envs = z.TypeOf<typeof Environments>;

export function ensureEnvironments(): Envs {
  return Environments.parse(import.meta.env);
}
