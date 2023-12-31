import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const youtubeApiHeaders={
    'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
}

const createRequest= (url) =>({url,headers:youtubeApiHeaders});


export const youtubeApi=createApi({
    reducerPath:'youtubeApi',
    baseQuery :fetchBaseQuery({baseUrl:process.env.REACT_APP_CRYPTO_API_URL}),
    endpoints : (builder)=> ({
        getResult :builder.query({
            query : (url1) =>{
                //console.log(typeof(url1));q=${url1}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date
                const request=createRequest(`/search?part=snippet%2Cid&regionCode=IN&maxResults=50&order=date&q=${url1}`);
                // console.log('API Request:', request);
                return request;
            },
        }),
        getVideo :builder.query({
            query : (id) =>{
                //console.log(typeof(url1));q=${url1}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date
                const request=createRequest(`/videos?part=snippet,statistics&id=${id}`);
                // console.log('API Request:', request);
                return request;
            },
        }),
        getchannel :builder.query({
            query : (id) =>{
                //console.log(typeof(url1));q=${url1}
                const request=createRequest(`/channels?part=snippet,statistics&id=${id}`);
                // console.log('API Request:', request);
                return request;
            },
        }),
        getRelated :builder.query({
            query : (id) =>{
                //console.log(typeof(url1));q=${url1}
                const request=createRequest(`search?part=snippet&relatedToVideoId=${id}&type=video`);
                // console.log('API Request:', request);
                return request;
            },
        }),
        
    }),

});
export const {
    useGetResultQuery,
    useGetVideoQuery,
    useGetchannelQuery,useGetRelatedQuery
}=youtubeApi;
