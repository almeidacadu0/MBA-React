export function getAgeFrom(birthDate) {
  if (!birthDate) {
    return '?';
  }
  const [birthYear, birthMonth, birthDay] = birthDate.split('-');

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  const age = todayYear - parseInt(birthYear, 10);

  if (parseInt(birthMonth) > todayMonth) {
    return age - 1;
  } else if (
    parseInt(birthMonth) === todayMonth &&
    parseInt(birthDay, 10) > todayDay
  ) {
    return age - 1;
  }

  return age;
}
