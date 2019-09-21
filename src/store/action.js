import * as types from './mutation-types'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id == song.id
  })
}

//插入歌曲
export const insertSong = function ({ commit, state }, song) {
  let playlist = state.playlist
  window.console.log(playlist)
  let currentIndex = state.currentIndex
  let index = findIndex(state.playlist, song)
  currentIndex++
  playlist.splice(currentIndex, 0, song)

  if (index > -1) {
    // 如果当前插入的序号大于列列表中的序号
    if (currentIndex > index) {
      // 删掉
      playlist.splice(index, 1)
      // 因为删除后数组前移，所以 Index--
      currentIndex--
    } else {
      playlist.splice(index + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST_STATE, playlist)
  commit(types.SET_CURRENTINDEX_STATE, currentIndex)
  commit(types.SET_CURRENTSONG_STATE, playlist[currentIndex])
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