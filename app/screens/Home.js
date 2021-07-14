import React from 'react';
import { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from "../contexts/UserContext";
function Home(props) {

    const { signOut } = useContext(AuthContext);

    return (
        <View style={{ flex: 1 }}>
            <Text>Welcome</Text>

            <Text>Email: {props.user?.email}</Text>
            <Text>uid: {props.user?.uid}</Text>
            <Text>displayName: {props.user?.displayName}</Text>
            <Text>photo: {props.user?.photoURL}</Text>

            <TouchableOpacity onPress={() => signOut()} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }} >
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Logout</Text>
            </TouchableOpacity>


        </View>
    );
}

export default Home;