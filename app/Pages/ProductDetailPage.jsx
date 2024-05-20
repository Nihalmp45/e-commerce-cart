// ProductDetail.js
import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import PagerView from "react-native-pager-view";

const client = new ApolloClient({
  uri: "https://mock.shop/api",
  cache: new InMemoryCache(),
});

const GET_PRODUCT_DETAIL = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
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
            title
            image {
              url
            }
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

const ProductDetailPage = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await client.query({
          query: GET_PRODUCT_DETAIL,
          variables: { id: productId },
        });
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  console.log(product);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PagerView style={styles.pagerView} initialPage={0}>
        <View key="1">
          <Image
            source={{ uri: product.variants.edges[0].node.image.url }}
            style={styles.image}
          />
          <View className="flex justify-between flex-row">
            <Text style={styles.title}>
              {product.variants.edges[0].node.title}
            </Text>
            <Text className="text-xs text-blue-500 mt-3">swipe right →</Text>
          </View>
          <Text style={styles.price}>
            $ {product.variants.edges[0].node.price.amount}
          </Text>
        </View>
        <View key="2">
          <Image
            source={{ uri: product.variants.edges[1].node.image.url }}
            style={styles.image}
          />
          <View className="flex justify-between flex-row">
            <Text style={styles.title}>
              {product.variants.edges[1].node.title}
            </Text>
            <Text className="text-xs text-blue-500 mt-3">swipe right →</Text>
          </View>
          <Text style={styles.price}>
            $ {product.variants.edges[0].node.price.amount}
          </Text>
        </View>
        <View key="3">
          <Image
            source={{ uri: product.variants.edges[2].node.image.url }}
            style={styles.image}
          />
          <View className="flex justify-between flex-row">
            <Text style={styles.title}>
              {product.variants.edges[2].node.title}
            </Text>
            <Text className="text-xs text-blue-500 mt-3">swipe left ←</Text>
          </View>
          <Text style={styles.price}>
            $ {product.variants.edges[0].node.price.amount}
          </Text>
        </View>
      </PagerView>
      <Text style={styles.description}>{product.description}</Text>
      <Text className="text-black font-bold mt-4 text-xl">Size</Text>
      <View className="items-start">
        <TouchableOpacity className=" bg-blue-400 p-5 rounded-3xl mt-2">
          <Text className="text-white">7</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-gray-400 font-bold mt-4 text-xl">Price</Text>
      <View className="flex flex-row justify-between items-center">
        <Text className="text-black font-bold text-3xl">
          $ {product.variants.edges[0].node.price.amount}
        </Text>
        <TouchableOpacity className=" bg-blue-400 p-5 rounded-3xl">
          <Text className="text-white text-xl ">Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetailPage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 16,
    marginTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    color: "#0c0606",
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    color: "#9b9494",
    marginTop: 16,
  },
});
