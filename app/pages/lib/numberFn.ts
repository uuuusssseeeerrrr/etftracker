export const numberFormat = (value: any) => {
  return value ? Number(value).toLocaleString('ko-KR') : value;
}