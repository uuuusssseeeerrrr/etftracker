export const numberFormat = (value: any) => {
  if (!value) return value;
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  // -0을 "0"으로 정규화 (num === 0은 +0/-0 모두 참)
  const normalized = num === 0 ? 0 : num;
  // 원본 값의 소수 자릿수를 유지 (maximumFractionDigits만 쓰면 "1234.00" 같은 값의
  // 소수점이 Intl에 의해 통째로 잘려나가는 현상이 발생함)
  const decimalDigits = String(value).split('.')[1]?.length ?? 0;
  return normalized.toLocaleString('ko-KR', {
    minimumFractionDigits: decimalDigits,
    maximumFractionDigits: decimalDigits
  });
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