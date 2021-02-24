export const sel = (id: string) => `[data-testid="${id}"]`

export const randomValue = (): string =>
  Math.random()
    .toString(36)
    .substring(9, 2)
