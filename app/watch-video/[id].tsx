import React, { useRef,  useEffect, useState} from 'react';
import useFetchVideo from "../../hooks/useFetchVideo";
import YoutubePlayer from 'react-native-youtube-iframe';
import { View,Text, TouchableOpacity, SafeAreaView, Alert, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import GlowButton from '@/components/GlowButton';

export default function WatchVideo() {

  const { id } = useLocalSearchParams();
  const router = useRouter();

  const videoId = Array.isArray(id) ? id[0] : id;

  const playerRef = useRef(null);

  const {videos, getVideos } = useFetchVideo(videoId);

  useEffect(() => {
    if (videoId) {
      getVideos();
    }
  }, [videoId]);

  const onGoToFavorites = () =>{
    router.push(`/`);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
      source={require('../../assets/images/bg.png')}  
      style={{ flex: 1 }}
      resizeMode="cover"  
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{width: '100%',    height: 250, zIndex: 10}}>
            <YoutubePlayer
            ref={playerRef}
            height={250}
            play={true}
            videoId={videos[0]?.key}
            onChangeState={event => console.log(event)}
          />
          </View>
          <TouchableOpacity 
            style={{
              marginTop: 20,
              backgroundColor: '#6495ed',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}
            onPress={onGoToFavorites}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Back</Text>
          </TouchableOpacity>
      </View>
    </ImageBackground>
  </SafeAreaView>
);
}
