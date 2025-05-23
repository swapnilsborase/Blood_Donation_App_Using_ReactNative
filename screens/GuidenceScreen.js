import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const guidanceLinks = {
  'Check you can donate': 'https://my.blood.co.uk/your-account/eligibility/check',
  'Give blood for first time': 'https://www.blood.co.uk/the-donation-process/giving-blood-for-the-first-time/',
  'Donating after trips abroad': 'https://my.blood.co.uk/your-account/eligibility/travel',
  'Preparing to give blood': 'https://www.blood.co.uk/the-donation-process/preparing-to-give-blood/',
  'Coronavirus guidance': 'https://www.blood.co.uk/news-and-campaigns/coronavirus',
  'Health and medications': 'https://my.blood.co.uk/your-account/eligibility/health',
};

const guidanceItems = Object.keys(guidanceLinks);

const GuidenceScreen = () => {
  const handlePress = (title) => {
    const url = guidanceLinks[title];
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Guidance</Text>
        <Text style={styles.headerSub}>
          Helpful Guides & Information about donating blood
        </Text>
      </View>

      {/* Scrollable Cards */}
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {guidanceItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.cardText}>{item}</Text>
          </TouchableOpacity>
        ))}

        {/* Bottom spacing to avoid overlap with bottom tab */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default GuidenceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FF3737',
    paddingVertical: 70,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSub: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#fcfcfc',
    borderColor: '#ff3737',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 12,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 2 },
  },
  cardText: {
    fontSize: 18,
    color: '#ff3737',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
