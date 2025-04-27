export function formatToCurrency(value: number | null | undefined): string {
    if (value == null) return '';
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }