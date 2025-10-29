export const numberFormat = (value: any) => {
  return value ? Number(value).toLocaleString('ko-KR') : value;
}

export const padRate = (value: any, currentTab: String) : String => {
  if(value === undefined || value === null) {
    return '0';
  }

  if(!isNaN(value) && currentTab !== 'JPY') {
    if(value.toString().length == 6) {
      return value.toString().padEnd(7, '0');
    } else {
      return value.toString();
    }
  } else {
    return value.toString();
  }
}

export const formatPercent = (value: any) => {
  if(value === undefined || value === null) {
    return '0.00%';
  }
  return `${(Number(value) * 100).toFixed(2)}%`;
}