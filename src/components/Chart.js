import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from "@rainbow-me/animated-charts";
import { useSharedValue } from "react-native-reanimated";

const Chart = ({
  currentPrice,
  symbol,
  logoUrl,
  name,
  priceChangePercentage7d,
  sparkline,
}) => {
  const [chartReady, setChartReady] = useState(false);
  const latestCurrentPrice = useSharedValue(currentPrice);
  const priceChangeColor = priceChangePercentage7d > 0 ? "#34C759" : "#FF3B30";
  const { width: SIZE } = Dimensions.get("window");

  useEffect(() => {
    latestCurrentPrice.value = currentPrice;

    setTimeout(() => {
      setChartReady(true);
    }, 0);
  }, [currentPrice]);

  const formatUSD = (value) => {
    "worklet"; //Uses UI thread
    if (value === "") {
      return `$ ${latestCurrentPrice.value
        .toFixed(5)
        .toString()
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        .replace(/(\.[0-9]*?)0+/g, "")}`;
    }

    return `$ ${parseFloat(value).toFixed(5)}`;
  };

  return (
    <ChartPathProvider
      data={{ points: sparkline, smoothingStrategy: "bezier" }}
    >
      <View style={styles.chartWrapper}>
        <View style={styles.tilesWrapper}>
          <View style={styles.upperTitles}>
            <View style={styles.upperLeftTitle}>
              <Image source={{ uri: logoUrl }} style={styles.image} />
              <Text style={styles.subTitle}>
                {name} ({symbol.toUpperCase()})
              </Text>
            </View>
            <Text style={styles.subTitle}>7d</Text>
          </View>
          <View style={styles.lowerTitles}>
            <ChartYLabel
              format={formatUSD}
              style={[styles.boldTitle, { color: "black" }]}
            />
            {/* <Text style={styles.boldTitle}>
              $
              {currentPrice
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                .replace(/(\.[0-9]*?)0+/g, "")}
            </Text> */}
            <Text style={[styles.title, { color: priceChangeColor }]}>
              {priceChangePercentage7d.toFixed(2)}
            </Text>
          </View>
        </View>
        {chartReady && (
          <View style={styles.chartLineWrapper}>
            <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
            <ChartDot style={{ backgroundColor: "black" }} />
          </View>
        )}
      </View>
    </ChartPathProvider>
  );
};

const styles = StyleSheet.create({
  chartWrapper: {
    marginVertical: 16,
  },
  tilesWrapper: {
    marginHorizontal: 16,
  },
  upperTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upperLeftTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 24,
    width: 24,
    marginRight: 4,
  },
  subTitle: {
    fontSize: 14,
    color: "#A9ABB1",
  },
  lowerTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
  },
  chartLineWrapper: {
    marginTop: 40,
  },
});

export default Chart;
