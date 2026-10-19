export const formatToShamsi = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    // استفاده از Intl برای تبدیل به تقویم جلالی (شمسی)
    const formatter = new Intl.DateTimeFormat("fa-IR", {
      calendar: "persian",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // خروجی به صورت "۲۱ مهر ۱۴۰۵" یا مشابه آن می‌شود
    return formatter.format(date);
  } catch (error) {
    return dateString;
  }
};