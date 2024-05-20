// ProductDetail.js
import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Text, View, Image, ActivityIndicator, StyleSheet, ScrollView,TouchableOpacity } from "react-native";

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

  console.log(product)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.featuredImage.url }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>
        $ {product.variants.edges[0].node.price.amount}
      </Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text className="text-black font-bold mt-4 text-xl">Size</Text>
          <View className="items-start">
            <TouchableOpacity className=" bg-blue-400 p-5 rounded-3xl mt-2">
              <Text className="text-white">
                7
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-gray-400 font-bold mt-4 text-xl">Price</Text>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-black font-bold text-3xl">
            $ {product.variants.edges[0].node.price.amount}
            </Text>
            <TouchableOpacity
              className=" bg-blue-400 p-5 rounded-3xl"
            >
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
    marginTop:16,
  },
});
