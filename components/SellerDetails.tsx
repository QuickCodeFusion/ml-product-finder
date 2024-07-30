import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const SellerDetails = ({ sellerDetails, item1, item2 }) => {
  return (
    <View>
      <Text style={styles.subtitle}>Common Sellers</Text>
      <FlatList
        data={sellerDetails}
        keyExtractor={item => item.sellerId.toString()}
        renderItem={({ item }) => (
          <View style={styles.sellerContainer}>
            <Text style={styles.sellerTitle}>Seller ID: {item.sellerId}</Text>
            <FlatList
              data={item.items}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Text
                  style={[
                    styles.item,
                    (item.title.toLowerCase().includes(item1.toLowerCase()) ||
                    item.title.toLowerCase().includes(item2.toLowerCase()))
                      ? styles.highlight
                      : null
                  ]}
                >
                  {item.title} - {item.price} {item.currency_id}
                </Text>
              )}
            />
          </View>
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
  sellerContainer: {
    marginBottom: 20,
  },
  sellerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    padding: 5,
  },
  highlight: {
    backgroundColor: 'yellow',
  },
});

export default SellerDetails;
