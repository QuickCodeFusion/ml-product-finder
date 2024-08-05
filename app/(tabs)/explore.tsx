import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchHistory from '@/components/SearchHistory';
import SellerDetails from '@/components/SellerDetails';
import axios from 'axios';
import InputForm from '@/components/InputForm';
import { MERCADO_LIBRE_API_BASE } from '@/constants/Urls';

// Define types for API responses and state
interface Seller {
  id: string;
}

interface Item {
  id: string;
  title: string;
  seller: Seller;
}

interface SearchResult {
  results: Item[];
}

interface SellerDetail {
  sellerId: string;
  items: Item[];
}

export default function App() {
  const [item1, setItem1] = useState<string>('');
  const [item2, setItem2] = useState<string>('');
  const [sellerDetails, setSellerDetails] = useState<SellerDetail[]>([]);
  const [searchHistory, setSearchHistory] = useState<{ item1: string; item2: string }[]>([]);

  const searchMercadoLibre = async (query: string): Promise<SearchResult | null> => {
    try {
      const response = await axios.get<SearchResult>(`${MERCADO_LIBRE_API_BASE}/sites/MLA/search`, {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data from Mercado Libre', error);
      return null;
    }
  };

  const handleSearch = async () => {
    if (!item1 || !item2) return;

    // Add the new search to history
    const newSearch = { item1, item2 };
    const updatedSearchHistory = [newSearch, ...searchHistory.slice(0, 9)];
    setSearchHistory(updatedSearchHistory);

    try {
      // Fetch data for item1 and item2 from Mercado Libre
      const searchItem1 = await searchMercadoLibre(item1);
      const searchItem2 = await searchMercadoLibre(item2);

      if (!searchItem1 || !searchItem2) return;

      // Collect all unique sellers from both items
      const sellersItem1 = searchItem1.results.map(item => item.seller.id);
      const sellersItem2 = searchItem2.results.map(item => item.seller.id);
      const uniqueSellers = Array.from(new Set([...sellersItem1, ...sellersItem2]));

      // Fetch details for each seller
      const sellerDetails = await Promise.all(
        uniqueSellers.map(async (sellerId) => {
          const sellerItemsResponse = await axios.get<SearchResult>(`${MERCADO_LIBRE_API_BASE}/sites/MLA/search`, {
            params: { seller_id: sellerId },
          });
          return {
            sellerId,
            items: sellerItemsResponse.data.results,
          };
        })
      );

      setSellerDetails(sellerDetails);
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
