import { Stack,Slot,useRouter,useSegments } from "expo-router";
import {ClerkProvider,useAuth} from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import {useEffect} from "react";
import { ActivityIndicator,View } from "react-native";
import * as SecureStore from "expo-secure-store";

const publishableKey = process.env.CLERK_PUBLISHABLE_KEY

function InitialLayout(){
  const {isLoaded,isSignedIn,getToken} = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if(!isLoaded) return

    const inAuthGroup = segments[0] === '(auth)'

    if(isSignedIn && inAuthGroup){
      syncWithBackend(getToken).then(() =>{
        router.replace('/(app)/home')
      })
    }else if(!isSignedIn && !inAuthGroup){
      router.replace('/(auth)/sign-in')
    }
  },[isLoaded,isSignedIn,segments])

  if(!isLoaded){
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return <Slot />
}

async function syncWithBackend(getToken: () => Promise<string | null>){
  try{
    const clerkToken = await getToken()
    if(!clerkToken) return

    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/login`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ clerkToken }),
    })
    if(!res.ok) return 

    const{ token } = await res.json()

    await SecureStore.setItemAsync('app_jwt',token)
  }catch(err){
    console.error('Backend sync failed:',err)
  }
}
export default function RootLayout() {
  return(
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  )
}
