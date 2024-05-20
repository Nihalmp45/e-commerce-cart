import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const client = new ApolloClient({
  uri: "https://mock.shop/api",
  cache: new InMemoryCache(),
});

const GET_PRODUCTS = gql`
  {
    products(first: 20) {
      edges {
        node {
          id
          title
          description
          featuredImage {
            id
            url
          }
          variants(first: 3) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await client.query({
          query: GET_PRODUCTS,
        });
        setProducts(response.data.products.edges.map((edge) => edge.node));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  

  return (
    <ScrollView>
      <SafeAreaView>
        <View className="pt-4 pl-5 bg-white">
          <Text className="text-xl font-bold">Popular Products →</Text>
        </View>
        <View style={styles.container}>
          {products.length > 0 ? (
            <FlatList
              data={products}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() =>
                  navigation.navigate("Detail", { productId: item.id })
                }>
                  <View style={styles.card}>
                    <Image
                      source={{ uri: item.featuredImage.url }}
                      style={styles.image}
                    />
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>
                      $ {item.variants.edges[0].node.price.amount}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <Text>No products available</Text>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
  },
  card: {
    width: 180,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 150,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "start",
    marginVertical: 5,
    paddingLeft: 10,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "start",
    marginVertical: 6,
    paddingLeft: 10,
  },
});
