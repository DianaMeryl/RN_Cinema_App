import { useState} from 'react';

interface Video {
    key: string;
  }

export default function useFetchVideo(id:string) {

    const [videos, setVideos] = useState<Video[]>([]);

    const getVideos = async() => {
        try{
        await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.EXPO_PUBLIC_MOVIE_API_KEY}&language=en-US`)
            .then(res => res.json())
            .then(json => setVideos(json.results))
        }
        catch(err){
            console.error(err);
        }
    }
return {videos, getVideos}
}


