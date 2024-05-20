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
import Toast from "react-native-toast-message";

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
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);

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

  const showToast = () => {
    const variant = product.variants.edges[currentVariantIndex].node;
    Toast.show({
      type: "success",
      text2: `${variant.title} successfully added to cart 🎉`,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => setCurrentVariantIndex(e.nativeEvent.position)}
      >
        {product.variants.edges.map((variant, index) => (
          <View key={index}>
            <Image
              source={{ uri: variant.node.image.url }}
              style={styles.image}
            />
            <View style={styles.variantHeader}>
              <Text style={styles.title}>{variant.node.title}</Text>
              {index === 0 && (
                <Text style={styles.swipeText}>swipe right →</Text>
              )}
              {index === 1 && (
                <Text style={styles.swipeText}>swipe right →</Text>
              )}
              {index === 2 && (
                <Text style={styles.swipeText}>← swipe left</Text>
              )}
            </View>
            <Text style={styles.price}>$ {variant.node.price.amount}</Text>
          </View>
        ))}
      </PagerView>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.sizeLabel}>Size</Text>
      <View style={styles.sizeContainer}>
        <TouchableOpacity style={styles.sizeButton}>
          <Text style={styles.sizeText}>7</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.priceLabel}>Price</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.totalPrice}>
          $ {product.variants.edges[currentVariantIndex].node.price.amount}
        </Text>
        <TouchableOpacity style={styles.addToCartButton} onPress={showToast}>
          <Text style={styles.addToCartText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetailPage;

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
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
  variantHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  swipeText: {
    fontSize: 12,
    color: "#0000ff",
    marginTop: 3,
  },
  price: {
    fontSize: 24,
    color: "#0c0606",
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    color: "#9b9494",
  },
  sizeLabel: {
    fontSize: 18,
  },
  sizeButton: {
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 15,
    marginTop: 8,
    width:35,
  },
  sizeText: {
    color: "#fff",
    fontSize: 16,
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#9b9494",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 15,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
  },
});
