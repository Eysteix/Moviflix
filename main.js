const overlay = document.querySelector(".mobile-overlay");
const navMobile = document.querySelector(".mobile");


function navClose(e) {
  if(event.target  ===  navMobile){
   console.log("nav clicked")
  }
  else {
      overlay.classList.remove("active");
  }
}

function navOpen(param) {
  overlay.classList.add("active");
}

const form = document.querySelector('form')

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const data = new FormData(form);
  const search = data.get('search');
  const parsedSearch = search.replace(/\s+/g,'%20');
  return getMovies(parsedSearch);
})


 async function getMovies(query) {
  console.log('started')
  
  
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  console.log(url)
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTRmM2ZhNDk5NmE5NTI0ZWRhYzkyYzU4NmQwODAxOCIsIm5iZiI6MTY3OTM1ODM4Ny4wMSwic3ViIjoiNjQxOGY5YjMzMTAzMjUwMDg2Zjk1MmJmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.0PwHe-eHQvA1AnVud3CPHiP1aEiySgEmib5wIbQL52w'
  }
};

 const data = await fetch(url,options);
 const parse = await data.json();
 console.log(parse)
 const cards  = parse.results.map((item)=>(
   `
   <div class='imgCards'>
<div class='imgCard'>
     <img src='https://image.tmdb.org/t/p/original/${item.backdrop_path}' alt='${item.original_title} image
'>
      ${item.original_title}
   </div>
   </div>
   `
   )).join('')
  
  const feed = document.querySelector(".hero-con");
  feed.innerHTML = cards;

  
}