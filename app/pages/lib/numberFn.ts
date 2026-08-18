export const numberFormat = (value: any) => {
  if (!value) return value;
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  // -0을 "0"으로 정규화 (num === 0은 +0/-0 모두 참)
  const normalized = num === 0 ? 0 : num;
  // maximumFractionDigits만 넉넉히 주면 trailing zero는 Intl이 알아서 잘라줌
  return normalized.toLocaleString('ko-KR', { maximumFractionDigits: 20 });
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