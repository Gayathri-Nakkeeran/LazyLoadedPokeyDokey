import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


export default function ProductDescriptionPage() {

  const posts = useSelector(state => state.posts);
  const isLoading = useSelector(state => state.isLoading);
  const fullInfo = useSelector(state => state.fullInfo);
  const dispatch = useDispatch();
  const pokeNum = useParams();
  let pages = useNavigate();



  useEffect(() => {

    let url = posts[pokeNum.id].url;
    dispatch({ type: 'getPokemonDetail', url: url })
  }, [])

  const movePrevious = () => {
    pages('/');
  }

  if (isLoading) {
    return (

      <div className=" mainDiv loader"><h2>Loading....</h2></div>
    );
  }


  let keyNumber = Number(pokeNum.id) + 1;
  let imgNumber = '00' + keyNumber;
  let imgSource1 = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + imgNumber.substr(imgNumber.length - 3) + '.png';



  return (
    <div className="mainPDPDiv" >

      <div className="container-fluid">
        <div className="row flex d-flex justify-content-center align-items-center">
          <div className="col-md-6 col-12">
            <div className='pokeDetails'>
              <div className='text-center pokeName'>
                <h1>{posts[pokeNum.id].name.toUpperCase()}</h1>
              </div>
              <br></br>
              <div className="container-info d-flex flex-wrap my-4">
                <div className="abilitiesInfo">
                  <div>
                    <h4>Height</h4>
                  </div>
                  <p>{fullInfo?.height} meter</p>
                </div>
                <hr className="breakLine" />
                <div className="abilitiesInfo">
                  <div>
                    <h4>Weight</h4>
                  </div>
                  <p>{fullInfo?.weight} kg</p>
                </div>
                <hr className="breakLine" />
                <div className="abilitiesInfo">
                  <div>
                    <h4>Abilities</h4>
                  </div>
                  <p>{fullInfo?.abilities?.map((ability) => { return (ability.ability.name + '  '); })}</p>
                </div>
                <hr className="breakLine" />
                <div className="abilitiesInfo">
                  <div>
                    <h4>Base Experience</h4>
                  </div>
                  <p>{fullInfo?.base_experience} years</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="slicky-slide">
              <img className="upDownAnimation" src={imgSource1} />
              <div className='button'>
                <button className="backButton" onClick={movePrevious}>Go Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


}