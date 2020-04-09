const env = { ...process.env };

/**
 * Get environment variable by name
 *
 * @param key The variable name
 * @param fallback The variable fallback value
 */
function get(key: string): string | undefined;
function get<T>(key: string, fallback: T): string | T;
function get<T>(key: string, fallback: T, parseFunction: (value: string) => T): T;
function get<T>(key: string, fallback?: T, parseFunction?: (value: string) => T): string | T {
  const value = env[key];
  const result = value || fallback;
  return parseFunction && value ? parseFunction(value) : result;
}

/**
 * Config parse functions
 */
const parse = {
  boolean(env: string): boolean {
    return env === 'true';
  },
  integer(env: string): number {
    return parseInt(env, 10);
  },
  float(env: string): number {
    return parseFloat(env);
  },
  stringArray(env: string): string[] {
    return env.split(',').map(value => value.trim());
  },
};

export const config = {
  get,
  parse
}
