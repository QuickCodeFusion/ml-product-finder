import React from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';

const SearchHistory = ({ searchHistory }) => {
  return (
    <View>
      <Text style={styles.subtitle}>Search History</Text>
      <FlatList
        data={searchHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.historyItem}>{item.item1} & {item.item2}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  historyItem: {
    marginBottom: 5,
  },
});

export default SearchHistory;
