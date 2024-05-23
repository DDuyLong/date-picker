import * as yup from 'yup';
import dayjs from 'dayjs';

// Định nghĩa schema tùy chỉnh cho dayjs
const dayjsSchema = yup.mixed().test(
  'is-dayjs',
  '${path} must be a valid dayjs date',
  (value) => {
    return dayjs.isDayjs(value) && value.isValid();
  }
).transform((value, originalValue, context) => {
  if (context.isType(value)) return value;
  const dayjsValue = dayjs(originalValue);
  return dayjsValue.isValid() ? dayjsValue : value;
});

export default dayjsSchema;