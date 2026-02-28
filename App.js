import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView
} from "react-native";

const menu = [
  { id: 1, name: "Idli", price: 8 },
  { id: 2, name: "Plain Dosa", price: 40 },
  { id: 3, name: "Onion Dosa", price: 60 },
  { id: 4, name: "Masala Dosa", price: 70 },
  { id: 5, name: "Special Dosa", price: 80 },
  { id: 6, name: "Uthappam", price: 50 },
  { id: 7, name: "Paratha", price: 30 }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [firstOrder, setFirstOrder] = useState(true);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const getTotal = () => {
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    if (firstOrder) {
      let discount = total * 0.5;
      if (discount > 100) discount = 100;
      total -= discount;
    }
    return total;
  };

  const placeOrder = () => {
    if (!mobile || !address) {
      Alert.alert("Enter mobile & address");
      return;
    }

    setFirstOrder(false);
    Alert.alert(
      "Order Confirmed",
      "Your order will arrive in 30 minutes\nTotal: ₹" + getTotal()
    );
    setCart([]);
  };

  return (
    <ScrollView style={{ backgroundColor: "#FFF8E1" }}>
      <Image
        source={require("./assets/cover.jpg")}
        style={{ width: "100%", height: 200 }}
      />

      <Text style={{ fontSize: 28, margin: 15 }}>DosaHub</Text>

      {menu.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => addToCart(item)}
          style={{
            backgroundColor: "#fff",
            padding: 15,
            margin: 10,
            borderRadius: 10
          }}
        >
          <Text>
            {item.name} - ₹{item.price}
          </Text>
        </TouchableOpacity>
      ))}

      <TextInput
        placeholder="Mobile Number"
        style={{ borderWidth: 1, margin: 10, padding: 10 }}
        value={mobile}
        onChangeText={setMobile}
      />

      <TextInput
        placeholder="Delivery Address"
        style={{ borderWidth: 1, margin: 10, padding: 10 }}
        value={address}
        onChangeText={setAddress}
      />

      <Text style={{ margin: 15 }}>Total: ₹{getTotal()}</Text>

      <TouchableOpacity
        onPress={placeOrder}
        style={{
          backgroundColor: "#E64A19",
          padding: 15,
          margin: 15,
          borderRadius: 10
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Place Order
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
