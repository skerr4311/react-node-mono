export const toSnakeCase = (obj: Record<string, string>): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key.replace(/([A-Z])/g, '_$1').toLowerCase(), // Convert camelCase to snake_case
      value,
    ]),
  );
};

export const toCamelCase = (obj: Record<string, string>): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key.replace(/_([a-z])/g, (_, char) => char.toUpperCase()), // Convert snake_case to camelCase
      value,
    ]),
  );
};
