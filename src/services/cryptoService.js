import axios from "axios";
import moment from "moment";

const formatSparkLine = (numbers) => {
  const sevenDaysAgo = moment().subtract(7, "days").unix();
  const formattedSparkLine = numbers.map((item, index) => {
    return {
      x: sevenDaysAgo + (index + 1) * 3600,
      y: item,
    };
  });
  return formattedSparkLine;
};

const formatMarketData = (data) => {
  const formattedData = [];

  data.forEach((item) => {
    const formattedSparkLine = formatSparkLine(item.sparkline_in_7d.price);
    const formattedItem = {
      ...item,
      sparkline_in_7d: {
        price: formattedSparkLine,
      },
    };

    formattedData.push(formattedItem);
  });

  return formattedData;
};

export const getMarketData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d"
    );
    const data = response.data;
    const formatedResponse = formatMarketData(data);
    return formatedResponse;
  } catch (err) {
    console.log(err);
  }
};
