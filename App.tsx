import { TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';
import * as SMS from 'expo-sms';
import SMSConfig from './config/SMSConfig';
import { useEffect, useState } from 'react';

const LIMIT = 100;
const { addresses, text, multipart } = SMSConfig;
const PAGE_COUNT = Math.ceil(addresses.length / LIMIT);

export default function App() {
  const [pointer, setPointer] = useState<number>(0);
  const [result, setResult] = useState<string>();
  const [sentAddresses, setSentAddresses] = useState<string[]>([]);

  const handleSendingSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) return;

    const splitedAddresses = addresses.slice(pointer, pointer + LIMIT);

    await SMS.sendSMSAsync([...splitedAddresses], text);
    setSentAddresses((sentAddresses) => [...sentAddresses, ...splitedAddresses]);

    setPointer((pointer) => pointer + Math.min(LIMIT, splitedAddresses.length));
  };

  const handleReset = () => {
    setPointer(0);
    setResult([]);
    setSentAddresses([]);
  };

  useEffect(() => {
    setResult(`${pointer}/${addresses.length} 완료\n`);
  }, [pointer]);

  return (
    <View style={[styles.container]}>
      <View style={styles.innerContainer}>
        <View style={{ flex: 3, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Text style={styles.centeredText}>문자를 보내봐용</Text>
          <Text style={styles.centeredText}>{new Date().toLocaleTimeString()}</Text>
        </View>
        <TouchableOpacity
          style={[styles.button, { height: 200, backgroundColor: '#0b5ed7' }]}
          onPress={handleSendingSMS}
          disabled={pointer === addresses.length}
        >
          <Text style={[styles.centeredText, { color: '#fff', fontWeight: 'bold', fontSize: 20 }]}>보내기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { height: 100, backgroundColor: '#4630eb' }]} onPress={handleReset}>
          <Text style={[styles.centeredText, { color: '#fff', fontWeight: 'bold', fontSize: 20 }]}>리셋</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <Text>{result}</Text>
        {sentAddresses && (
          <FlatList
            data={sentAddresses.map((phoneNumber) => ({ key: phoneNumber }))}
            renderItem={({ item }) => <Text>{item.key}</Text>}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: '5%',
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  centeredText: {
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
  },
});
