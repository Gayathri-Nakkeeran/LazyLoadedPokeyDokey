import {takeEvery, put, call} from 'redux-saga/effects';


const getPosts = async () => {
    return await fetch("https://pokeapi.co/api/v2/pokemon/")
    .then((data) => {
    return data.json().then((value) => {
    return value
    })
    })
    }


const getDetail = async (url) => {
    return await fetch(url)
    .then((data) => {
    return data.json().then((value) => {
    return value
    })
    })
}

function* firstPageSaga(){
  const posts = yield call(getPosts);
  yield put({type:'initialPageLoad' , posts:posts , isLoading:false})


}

function* secondPageSaga(action){
    const fullInfo = yield call(getDetail , action.url);
    yield put({type:'descriptionPageLoad' , fullInfo:fullInfo})
  
  
  }


function* rootSaga(){
    yield takeEvery('LoadPage' , firstPageSaga)
    yield takeEvery('DetailPageLoad' , secondPageSaga)
   
}

export default rootSaga;