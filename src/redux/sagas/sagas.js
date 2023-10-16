import { takeEvery, put, call, select } from 'redux-saga/effects';
import { getFirstPokemon, loadMorePokemon, getPokemonDetail, getOffset } from '../slice/slice';
// import { useSelector } from 'react-redux'


const getApiData = async (offset) => {

  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`
  const data = await fetch(url)
    .then((data) => {

      return data.json().then((value) => {

        return value
      })
    })

  return data.results
}


const getDetail = async (url) => {
  return await fetch(url)
    .then((data) => {
      return data.json().then((value) => {
        return value
      })
    })
}

function* getPokeSaga() {

  const posts = yield call(getApiData, 0);

  // console.log(posts.next);
  // console.log(typeof(initialPageLoad))

  yield put(getFirstPokemon({ posts: posts, isLoading: false, offset: 0 }));
  // yield put({type:'initialPageLoad' , posts:posts , isLoading:false})


}

function* getPokeDetailSaga(action) {
  const fullInfo = yield call(getDetail, action.url);
  yield put(getPokemonDetail({ fullInfo: fullInfo }));


}

function* loadMorePokeSaga() {
  const offset = (yield select(getOffset));
  const nextPosts = yield call(getApiData, offset)
  yield put(loadMorePokemon({ nextPosts: nextPosts, isLoading: false, offset: offset }));

}


function* rootSaga() {
  yield takeEvery('getPokemonList', getPokeSaga)
  yield takeEvery('getPokemonDetail', getPokeDetailSaga)
  yield takeEvery('loadMorePokemon', loadMorePokeSaga)

}

export default rootSaga;