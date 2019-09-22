import * as types from './mutation-types'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id == song.id
  })
}

//插入歌曲
export const insertSong = function ({ commit, state }, song) {
  let playlist = state.playlist
  let currentIndex = state.currentIndex
  let index = findIndex(state.playlist, song)

  if (index > -1) {
    currentIndex = index
  } else {
    currentIndex++
    playlist.splice(currentIndex, 0, song)
  }


  commit(types.SET_PLAYLIST_STATE, playlist)
  commit(types.SET_CURRENTINDEX_STATE, currentIndex)
  commit(types.SET_CURRENTSONG_STATE, playlist[currentIndex])
  commit(types.SET_CURRENTPLAYFLAG_STATE, false)
}


//删除播放列表歌曲
export const deleteSong = function ({ commit, state }, song) {
  let playlist = state.playlist
  let index = findIndex(state.playlist, song)
  playlist.splice(index, 1)

  window.console.log(index, state.playlist.length)
  if (index == state.playlist.length) {
    index--
  }
  commit(types.SET_PLAYLIST_STATE, playlist)
  commit(types.SET_CURRENTINDEX_STATE, index)
  commit(types.SET_CURRENTSONG_STATE, playlist[index])
  commit(types.SET_CURRENTPLAYFLAG_STATE, false)
}

//播放列表全部歌曲
export const playListAll = function ({ commit }, list) {
  window.console.log(list)
  commit(types.SET_PLAYLIST_STATE, list)
  commit(types.SET_CURRENTINDEX_STATE, 0)
  commit(types.SET_CURRENTSONG_STATE, list[0])
  commit(types.SET_CURRENTPLAYFLAG_STATE, false)
}