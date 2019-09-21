/**
 * API统一接口
 */

import { get } from './http'

const url = 'http://localhost:3000'

/*获取推荐歌单*/
export const getPlaylist = p => get(url + '/top/playlist', p)

/*获取所有榜单内容及摘要*/
export const getToplistDetail = p => get(url + '/toplist/detail', p)

/*获取歌手分类列表*/
export const getArtistList = p => get(url + '/artist/list', p)

/*获取热搜列表*/
export const getSearchHotDetail = p => get(url + '/search/hot/detail', p)

/*获取搜索建议*/
export const getSearchSuggest = p => get(url + '/search/suggest', p)

/*获取歌单详情*/
export const getPlaylistDetail = p => get(url + '/playlist/detail', p)

/*获取歌手单曲*/
export const getArtists = p => get(url + '/artists', p)

/*搜索歌曲*/
export const getSearch = p => get(url + '/search', p)

/*获取推荐新音乐*/
export const getPersonalizedNewsong = p => get(url + '/personalized/newsong', p)

/*获取歌曲url*/
export const getSongUrl = p => get(url + '/song/url', p)

/*获取歌曲详情*/
export const getSongsDetail = p => get(url + '/song/detail', p)