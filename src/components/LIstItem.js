import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ListItem = ({
  name,
  symbol,
  currentPrice,
  priceChangePercentage7d,
  logoUrl,
  openModal,
}) => {
  const priceChangeColor = priceChangePercentage7d > 0 ? "#34C759" : "#FF3B30";
  return (
    <TouchableOpacity onPress={openModal}>
      <View style={styles.itemWrapper}>
        {/* Left Side */}
        <View style={styles.leftWrapper}>
          <Image style={styles.image} source={{ uri: logoUrl }} />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subTitle}>{symbol.toUpperCase()}</Text>
          </View>
        </View>
        {/* Right Side */}
        <View style={styles.rightWrapper}>
          <Text style={styles.title}>
            $
            {currentPrice
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              .replace(/(\.[0-9]*?)0+/g, "")}
          </Text>
          <Text style={[styles.subTitle, { color: priceChangeColor }]}>
            {priceChangePercentage7d.toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  leftWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 48,
    width: 48,
  },
  titleWrapper: {
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
  },
  subTitle: {
    fontSize: 14,
    color: "#A9ABB1",
    marginTop: 4,
  },
  rightWrapper: {
    alignItems: "flex-end",
  },
});

export default ListItem;
