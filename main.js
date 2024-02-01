const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
});
api.defaults.headers.common['X-API-KEY'] = 'live_P7vXs96PloEJcNhp1rQtlNk0yh7kLXZUqtTMybgHkDkDNqoBJG1n1o4nGZGqDUJt';

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_P7vXs96PloEJcNhp1rQtlNk0yh7kLXZUqtTMybgHkDkDNqoBJG1n1o4nGZGqDUJt';
const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites';
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';

const refreshBtn = document.getElementById('refreshBtn');
refreshBtn.addEventListener('click', loadRandomMichis);

const spanError = document.getElementById('error');

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);
  const data= await res.json();
  console.log('Random');
  console.log(data);

  const img1 = document.getElementById('img1');
  const img2 = document.getElementById('img2');
  const img3 = document.getElementById('img3');

  const btn1 = document.getElementById('btn1');
  const btn2 = document.getElementById('btn2');
  const btn3 = document.getElementById('btn3');

  img1.src = data[0].url;
  img2.src = data[1].url;
  img3.src = data[2].url;

  btn1.onclick = () => saveFavouriteMichi(data[0].id);
  btn2.onclick = () => saveFavouriteMichi(data[1].id);
  btn3.onclick = () => saveFavouriteMichi(data[2].id);
};

async function loadFavouriteMichis() {

  const res = await fetch(API_URL_FAVOURITES,{
    method: 'GET',
    headers: {
      'X-API-KEY': 'live_P7vXs96PloEJcNhp1rQtlNk0yh7kLXZUqtTMybgHkDkDNqoBJG1n1o4nGZGqDUJt',
    }
  })
  const data= await res.json();

  
  const section = document.getElementById('favouriteMichis');
  section.innerHTML = '';
  const h2 = document.createElement('h2');
  const h2Text = document.createTextNode('Michis favoritos');
  h2.appendChild(h2Text);
  section.appendChild(h2);

  data.forEach(michi => {
    const article = document.createElement('article');
    const img = document.createElement('img');
    const btn = document.createElement('button');
    const btnText = document.createTextNode('😾');

    btn.appendChild(btnText);
    btn.onclick = () => deleteFavouriteMichi(michi.id);
    img.src = michi.image.url;
    img.width = 250;

    article.appendChild(img);
    article.appendChild(btn);

    section.appendChild(article)
  });

  console.log(data)
  
};

async function saveFavouriteMichi(id){
  const {data, status} = await api.post('/favourites', {
    image_id: id,
  });

/*   const res = await fetch(API_URL_FAVOURITES,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'live_P7vXs96PloEJcNhp1rQtlNk0yh7kLXZUqtTMybgHkDkDNqoBJG1n1o4nGZGqDUJt',
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });

  const data = await res.json(); */

  console.log('Michi guardado en favoritos', data);

  loadFavouriteMichis();
}

async function deleteFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOURITES_DELETE(id),{
    method: 'DELETE',
    headers: {
      'X-API-KEY': 'live_P7vXs96PloEJcNhp1rQtlNk0yh7kLXZUqtTMybgHkDkDNqoBJG1n1o4nGZGqDUJt',
    }
  });
  const data = await res.json();
  console.log('Michi eliminado de favoritos',data);
  loadFavouriteMichis();
}

async function uploadMichiPhoto() {
  const form = document.getElementById('uploadingForm');
  const formData = new FormData(form);

  console.log(formData.get('file'));

  const res = await fetch(API_URL_UPLOAD, {
    method: 'POST',
    headers: {
      'X-API-KEY': 'live_P7vXs96PloEJcNhp1rQtlNk0yh7kLXZUqtTMybgHkDkDNqoBJG1n1o4nGZGqDUJt',
    },
    body: formData
  })

  console.log('Foto de michi subida!', res)
}

loadRandomMichis();
loadFavouriteMichis();