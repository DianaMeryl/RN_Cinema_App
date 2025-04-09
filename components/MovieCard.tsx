import { useContext } from "react";
import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { icons } from "@/constants/icons";

import { observer } from "mobx-react-lite";
import { StoreContext } from "../stores";

const MovieCard= observer(({ id, poster_path, title, vote_average, release_date }: Movie) =>{

  const { favoritesStore } = useContext(StoreContext);
  const isFav = favoritesStore.isFavorite(id);

  const handleFavoriteToggle = () => {
    if (isFav) {
      favoritesStore.removeFromFavorites(id);
    } else {
      // Формуємо об'єкт фільму для додавання до улюблених
      const movie = {
        id,
        poster_path,
        title,
        vote_average,
        release_date,
      };
      favoritesStore.addToFavorites(movie);
    }
  };

  return (
    <View className="w-[30%] mb-4 bg-[#800080]">
      <Link href={`/movie/${id}`} asChild>
        <TouchableOpacity className="w-full relative">
          <Image
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
            }}
            className="w-full h-52 rounded-lg"
            resizeMode="cover"
          />

          <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
            {title}
          </Text>

          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-medium text-light-300">
              Release
            </Text>
            <Text className="text-xs text-light-300 font-medium mt-1">
              {release_date?.split("-")[0]}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity onPress={handleFavoriteToggle}  className="absolute top-0 right-0 p-2 bg-transparent rounded-full">
          <Text className="text-2xl">{isFav ? "💖" : "🤍"}</Text>
      </TouchableOpacity>
    </View>
  );
});

export default MovieCard;