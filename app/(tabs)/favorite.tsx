import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { observer } from 'mobx-react-lite';
import {favoritesStore} from '../../stores';
import { useRouter } from 'expo-router';
import { images } from '@/constants/images';

interface FavoriteItem {
    id: string;
    poster_path: string;
    original_title: string;
  }

const Favorite = observer(() => {

  const router = useRouter();

  const goToTrailer = (videoId: string) => {
    router.push(`/watch-video/${videoId}`);
  };

  const handleRemoveFavorite = (id:string) => {
    favoritesStore.removeFromFavorites(id);
  };

  return (
      <SafeAreaView className="bg-primary" style={{ flex: 1, paddingBottom: 60}}>
        <Image
            source={images.bg}
            className="absolute w-full z-0"
            resizeMode="cover"
          />
        <ScrollView contentContainerStyle={styles.container}>
          {favoritesStore.favorites.map((item: FavoriteItem) => (
            <View key={item.id} style={styles.card}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.image}
                resizeMode="cover"
              />

              <Text style={styles.title}>{item.original_title}</Text>

              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.btn} onPress={() => goToTrailer(item.id)}>
                  <Text style={styles.btnText}>Trailer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => handleRemoveFavorite(item.id)}>
                  <Text style={styles.btnText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
    </SafeAreaView>
  );
});

export default Favorite;
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 10,
      padding: 10,
    },
    card: {
      width: 150,
      height: 'auto',
      backgroundColor: '#1a1a1a',
      borderRadius: 12,
      overflow: 'hidden',
      margin: 10,
      padding: 10,
    },
    image: {
      height: 250,
      width: '100%',
      borderRadius: 10,
    },
    title: {
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: 8,
    },
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    btn: {
      backgroundColor: '#800080',
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderRadius: 8,
    },
    btnText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  