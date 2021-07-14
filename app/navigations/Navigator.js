import React, { useReducer } from "react";
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AuthContext } from '../contexts/UserContext';
import { firebase } from "../firebase/config";

import Login from "../screens/LoginScreen";
import Signup from "../screens/SignupScreen";
import Home from "../screens/Home";

const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();



export default AppNavigation = (props) => {

    const initialLoginState = {
        isLoading: true,
        user: null,
    };
    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'LOGIN':
                return {
                    ...prevState,
                    user: action.user,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    user: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    user: action.user,
                    isLoading: false,
                };
        }
    };
    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);
    const authContext = React.useMemo(() => ({
        signIn: async (email, password) => {

            return firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(async (userCred) => {
                    dispatch({ type: 'LOGIN', user: userCred.user });
                    return true;
                }).catch((error) => {
                    if (error.code === "auth/user-disabled") {
                        alert("User disabled!");
                    }
                    if (error.code === "auth/invalid-email") {
                        alert("That email address is invalid!");
                    }
                    if (error.code === "auth/user-not-found") {
                        alert("User not found, please sign up!");
                    }
                    if (error.code === "auth/wrong-password") {
                        alert("Wrong password!");
                    }

                    return false;
                })
        },
        signOut: async () => {
            return firebase
                .auth()
                .signOut()
                .then(async () => {
                    dispatch({ type: 'LOGOUT' });
                });
        },
        signUp: (email, password) => {
            return firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCred) => {
                    dispatch({ type: 'REGISTER', user: userCred.user });
                }).catch((error) => {
                    if (error.code === "auth/email-already-in-use") {
                        alert("That email address is already in use!");
                    }
                    if (error.code === "auth/invalid-email") {
                        alert("That email address is invalid!");
                    }
                    if (error.code === "auth/operation-not-allowed") {
                        alert("Operation is not allowed!");
                    }
                    if (error.code === "auth/weak-password") {
                        alert("The password is too weak!");
                    }
                    return false;
                })
        }

    }), []);



    if (loginState.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="green" />
            </View>
        );
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer >
                {loginState.user !== null ? (
                    <Drawer.Navigator >
                        <Drawer.Screen name="Home" user={loginState.user} component={Home} />
                    </Drawer.Navigator>
                )
                    :
                    (
                        <RootStack.Navigator headerMode='none'>
                            <RootStack.Screen name="Login" component={Login} />
                            <RootStack.Screen name="Signup" component={Signup} />
                        </RootStack.Navigator>
                    )
                }
            </NavigationContainer>
        </AuthContext.Provider>
    )

}