import { useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,ActivityIndicator } from "react-native";

export default function SignUpScreen(){
    const { isLoaded,signUp,setActive } = useSignUp()

    const router = useRouter()

    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[code,setCode] = useState('')
    const[pendingVerification,setPendingVerification] = useState(false)
    const[loading,setLoading] = useState(false)

    const onSignUp = async() => {
        if(!isLoaded) return
        setLoading(true)

        try{
            await signUp.create({emailAddress:email,password})
            await signUp.prepareEmailAddressVerification({strategy: 'email_code'})
            setPendingVerification(true)
        }catch(err:any){
            Alert.alert('Sign up failed',err.error?.[0]?.message ?? err.message)
        }finally{
            setLoading(false)
        }
    }

    const onVerify = async () => {
    if (!isLoaded) return
    setLoading(true)
    try {
      const result = await signUp.attemptEmailAddressVerification({ code })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        // _layout.tsx useEffect will handle redirect + backend sync
      }
    } catch (err: any) {
      Alert.alert('Verification failed', err.errors?.[0]?.message ?? err.message)
    } finally {
      setLoading(false)
    }
  }

if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Check your email</Text>
        <TextInput
          style={styles.input}
          placeholder="Verification code"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
        />
        <TouchableOpacity style={styles.button} onPress={onVerify} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify</Text>}
        </TouchableOpacity>
      </View>
    )
}
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={onSignUp} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
        <Text style={styles.link}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 14, marginBottom: 14, fontSize: 16 },
  button: { backgroundColor: '#2563EB', borderRadius: 10, padding: 16, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  link: { textAlign: 'center', color: '#2563EB', marginTop: 8 },
})