export const OneCoin = (CryptoId) => `https://api.coingecko.com/api/v3/coins/${CryptoId}`;

export const ManyCoins = (currentMoney) => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentMoney}&order=market_cap_desc&per_page=250&page=1&sparkline=false`;

export const Chart = (CryptoId, Days=30, currentMoney) => `https://api.coingecko.com/api/v3/coins/${CryptoId}/market_chart?vs_currency=${currentMoney}&days=${Days}`;
