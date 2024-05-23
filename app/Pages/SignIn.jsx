import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();


  const handleSignIn = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Index")
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text
          style={styles.buttonText}
        
        >
          Sign In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <View style={styles.link}>
          <Text>Don't have an account?</Text>
          <Text style={styles.signIn}>Sign up </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default SignIn


const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      marginTop:100,
    },
    input: {
      height: 40,
      borderColor: "#ADD8E6",
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
      borderRadius:6,
      width: "80%",
    },
    error: {
      color: "red",
      marginBottom: 12,
    },
    button: {
      backgroundColor: "#E56717",
      paddingVertical: 12,
      paddingHorizontal: 32,
      marginVertical: 8,
      borderRadius: 12,
      alignItems: "center",
      width: "80%",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
    },
    link: {
        display: "flex",
        flexDirection: "row",
      },
      signIn:{
        fontSize:16,
        color:'blue',
        marginLeft:8,
      }
  });
