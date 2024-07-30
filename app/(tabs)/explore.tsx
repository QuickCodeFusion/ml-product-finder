import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import InputForm from './components/InputForm';
import SearchHistory from './components/SearchHistory';
import SellerDetails from './components/SellerDetails';
import axios from 'axios';

export default function App() {
  const [item1, setItem1] = useState('');
  const [item2, setItem2] = useState('');
  const [sellerDetails, setSellerDetails] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = async () => {
    if (!item1 || !item2) return;

    // Add the new search to history
    const newSearch = { item1, item2 };
    const updatedSearchHistory = [newSearch, ...searchHistory.slice(0, 9)];
    setSearchHistory(updatedSearchHistory);

    try {
      const response = await axios.get('http://localhost:3001/search', {
        params: { item1, item2 }
      });
      setSellerDetails(response.data.sellerDetails);
    } catch (error) {
      console.error('Error searching for items', error);
    }
  };

  return (
    <View style={styles.container}>
      <InputForm
        item1={item1}
        setItem1={setItem1}
        item2={item2}
        setItem2={setItem2}
        handleSearch={handleSearch}
      />
      <SearchHistory searchHistory={searchHistory} />
      <SellerDetails sellerDetails={sellerDetails} item1={item1} item2={item2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
