import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import ListItem from "./src/components/LIstItem";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { SAMPLE_DATA } from "./assets/data/sampleData";
import Chart from "./src/components/Chart";
import { getMarketData } from "./src/services/cryptoService";

const ListHeader = () => {
  return (
    <>
      <View style={styles.titleWrapper}>
        <Text style={styles.largeTitle}>Markets</Text>
      </View>
      <View style={styles.divider} />
    </>
  );
};

export default function App() {
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["45%"], []);

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    };

    fetchMarketData();
  }, []);

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current.present();
  };

  if (!data) {
    return <Text>Loading</Text>;
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <ListItem
              name={item.name}
              logoUrl={item.image}
              symbol={item.symbol}
              currentPrice={item.current_price}
              priceChangePercentage7d={
                item.price_change_percentage_7d_in_currency
              }
              openModal={() => openModal(item)}
            />
          )}
          ListHeaderComponent={() => <ListHeader />}
        />
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        {selectedCoinData && (
          <Chart
            currentPrice={selectedCoinData.current_price}
            symbol={selectedCoinData.symbol}
            logoUrl={selectedCoinData.image}
            name={selectedCoinData.name}
            priceChangePercentage7d={
              selectedCoinData.price_change_percentage_7d_in_currency
            }
            sparkline={selectedCoinData.sparkline_in_7d.price}
          />
        )}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleWrapper: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A9ABB1",
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 4,
    elevation: 5,
    shadowOpacity: 0.25,
  },
});
