import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import pokeCard from "../assets/poke.jpg"
import { LazyLoadImage } from 'react-lazy-load-image-component';




export default function ProductList() {

  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const isLoading = useSelector(state => state.isLoading);
  let boxElement;
  const handleScroll = () => {

    boxElement = document.getElementsByClassName("mainDiv")[0];
    if (window.innerHeight + Math.floor(document.documentElement.scrollTop) !== document.documentElement.offsetHeight) return;
    {
      createObserver();
    }
  }


  function createObserver() {
    let observer;
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25
    };

    observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(boxElement);
  }



  function handleIntersect() {

    dispatch({ type: 'loadMorePokemon' })

  }



  useEffect(() => {

    if (posts.length == 0) {
      dispatch({ type: 'getPokemonList' })
    }
    window.addEventListener(
      "scroll",
      () => handleScroll(),
      false,
    );
    return () => window.removeEventListener('scroll', handleScroll);
  }

    , [])

  let pages = useNavigate();
  const moveToNextPage = (key) => {
    pages(`/details/${key}`)

  }


  let keyNumber = 0;


  if (!isLoading) {
    return (
      <>
        <div className="mainDiv">
          <br></br>
          <div className="card-groups container">
            <br></br>
            <div className="row ">



              {posts?.map((info, key) => {

                keyNumber += 1;
                let imgNumber = '00' + keyNumber;
                let imgSource = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + imgNumber.substr(imgNumber.length - 3) + '.png';
                return (
                  <div loading="lazy" key={key} className="col-12 col-sm-6 col-md-6 col-lg-3  mb-5" onClick={() => { moveToNextPage(key) }}>
                    <div className="card">
                      <div className='card-inner' >
                        <div className='card-front'>

                          <LazyLoadImage className="card-img-top" src={imgSource} alt="Card image cap" />


                          <div className="card-body">
                            <h5 className="card-title">{info?.name?.toUpperCase()}</h5>

                          </div>


                        </div>
                        <div className="card-back m-2">

                          <img className="pokeImage " src={pokeCard} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <br></br>
          </div>
          <br></br>

        </div>
      </>
    );

  }
  return <div>Loading</div>


}


