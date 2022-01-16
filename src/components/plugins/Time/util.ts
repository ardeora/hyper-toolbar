import { tz } from 'moment-timezone';

export const getTimeZoneList = () => {
  let timeZonesList = tz.names();
  const currentTimeZone = tz.guess();
  const filterTimezones = ['UTC', currentTimeZone];

  timeZonesList = timeZonesList.filter((timeZone) => !filterTimezones.includes(timeZone));
  timeZonesList = [...filterTimezones, ...timeZonesList];

  return timeZonesList;
};
