export const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function getToday() {
  return "2021-06-17";
}

export function formatMonth(isoMonth: string) {
  const [year, month] = isoMonth.split("-");
  return `${MONTHS[parseInt(month) - 1]} de ${year}`;
}

export function prevMonth(month: string) {
  const jsDate = new Date(month + "-01T12:00:00");
  jsDate.setMonth(jsDate.getMonth() - 1);
  return `${jsDate.getFullYear()}-${jsDate.getMonth() + 1}`;
}

export function nextMonth(month: string) {
  const jsDate = new Date(month + "-01T12:00:00");
  jsDate.setMonth(jsDate.getMonth() + 1);
  return `${jsDate.getFullYear()}-${jsDate.getMonth() + 1}`;
}
export function addMonths(month: string, increment: number) {
  const jsDate = new Date(month + "-01T12:00:00");
  jsDate.setMonth(jsDate.getMonth() + increment);
  return `${jsDate.getFullYear()}-${(jsDate.getMonth() + 1).toString().padStart(2, "0")}`;
}
