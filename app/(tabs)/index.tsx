import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { useHeaderHeight } from "@react-navigation/elements";
import {Ionicons} from "@expo/vector-icons";
import Animated, {
  useAnimatedRef,
  useAnimatedStyle, 
  useScrollViewOffset,
  withTiming
} from 'react-native-reanimated';

const Index = () => {

  // const router = useRouter();

  const headerHeight = useHeaderHeight();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollHandler = useScrollViewOffset(scrollRef);

  const buttonStyle = useAnimatedStyle(() => {
    return {
      opacity: scrollHandler.value > 600 ? withTiming(1) : withTiming(0),
    }
  });

  const scrollTop = () => {
    scrollRef.current?.scrollTo({
      x:0, y:0, animated:true
    });
  };

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <Animated.ScrollView
        ref={scrollRef}
        style={{ paddingTop: headerHeight }}
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Image source={icons.logo} className="w-[125px] h-24 mt-10 mb-5 mx-auto" />

        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError  ? (
          <Text>Error: {moviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </Animated.ScrollView>

      <Animated.View style={[buttonStyle, {position: "absolute", bottom: 100, right:20}]}>
        <TouchableOpacity onPress={scrollTop} style={{backgroundColor: "#ff00ff", borderRadius: 20, padding: 10}}>
          <Ionicons name="chevron-up" size={28} color="white"/>
        </TouchableOpacity>
      </Animated.View>

    </View>
  );
};

export default Index;