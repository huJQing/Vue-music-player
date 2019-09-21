import * as types from './mutation-types'

const mutations = {

  //保存音乐列表
  [types.SET_PLAYLIST_STATE](state, list) {
    state.playlist = list
  },
  //保存当前播放歌曲的index
  [types.SET_CURRENTINDEX_STATE](state, index) {
    state.currentIndex = index
  },
  //保存当前播放的歌曲
  [types.SET_CURRENTSONG_STATE](state, song) {
    state.currentSong = song
  },
  //保存当前播放的歌曲
  [types.SET_CURRENTPLAYFLAG_STATE](state, flag) {
    state.currentPlayFlag = flag
  }

}

export default mutations