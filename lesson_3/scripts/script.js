"use strict";

movies.splice(60);

// --------------- NORMALIZE ALL MOVIES --------------- //
// --------------------Tartiblab Olish------------------//
//AllMovies ga uzimizga kerakli categorylarini yigib oldik

const AllMovies = movies.map((movies) => {
  return {
    title: movies.title,
    year: movies.year,
    category: movies.categories,
    lang: movies.language,
    id: movies.imdbId,
    time: `${Math.floor(movies.runtime / 60)}h ${movies.runtime % 60}m`,
    summary: movies.summary,
    link: `https://www.youtube.com/embed/${movies.youtubeId}`,
    maxImg: movies.bigThumbnail,
    minImg: movies.smallThumbnail,
    rating: movies.imdbRating,
  };
});

// ----------------------- RENDER ALL MOVIES function -----------------------//
// bu qism ui qismga chiqarish qismi buldi
//allmoviesdi  elementlaini tanlab oldik vacard nomli uzgaruvchiga create qilib div ochib clasiga card qushdik va qolgan kinonibg qismlarini taglarga create qildik va htmldagi wrapperga cadni qushib quydik va bularni hammasini urab turgan funcsiya yani render allmovies funcsiyasini ishlatib quydij
function renderAllMovies() {
  AllMovies.forEach((el) => {
    const card = createElement(
      "div",
      "card shadow-lg",
      `
        
        <img src="${el.minImg}" alt="img" class="card-img">
                                <div class="card-body">
                                    <h3 class="card-title">
                                        ${el.title}
                                    </h3>
                                    <ul class="list-unstyled">
                                    
                                     <li><strong>Language: ${el.lang} </strong></li> 
                                      <li><strong>Category: ${el.category} </strong></li>
                                        <li><strong>Year: ${el.year} </strong></li>
                                      
                                      
                                        <li><strong>Rating: ${el.rating} </strong></li>
                                        <li><strong>Runtime: ${el.time} </strong></li> 
                                        <li><strong><a href="${el.link}">Youtube</a></strong></li>
                                       
                                    </ul>
                                    <div class="social d-flex">
                                        <a href="${el.link}" target="_blank" class="btn btn-danger m-2">
                                            Trailer
                                        </a>
                                        <button class="btn btn-primary m-2">
                                            Read more . . .
                                        </button>
                                        <button class="btn btn-warning m-2">
                                            Add bookmark
                                        </button>
                                    </div>
                                </div>
        
        `
    );

    $(".wrapper").appendChild(card);
  });
}
renderAllMovies();

// -------------------DYNAMIC CATEGORYES------------------//
// bu categoryyalarni ui ga chhiqarishimiz uchun
//almociesdi elementiga kirib oldik va elementlarini ichhidan categoryga kirdik va kategorysini
// ham elementlariga kirib oldik va 1ta bulgan categorylarni 1ta arrayga pushh qilib oldik
//va uni sortlab oldik va kategoryning boshiga all ni qshib quydik
const dynamicCategory = () => {
  let category = [];
  AllMovies.forEach((e) => {
    e.category.forEach((el) => {
      if (!category.includes(el)) {
        category.push(el);
      }
    });
  });
  category.sort();
  category.unshift("All");
  // bu yerda categoryni elementlarini aylanib chiqib option nomli uzgaruvchiga create qilib
  //option tagi item option clasini ha elementlarni qushib oldik
  //va html dagi select option clasiga optionni
  category.forEach((el) => {
    const option = createElement("option", "item-option", el);
    $(".selectoption").appendChild(option);
  });
};

dynamicCategory();

// -------------------DYNAMIC CATEGORYES END ---------------//

// ----------------- FIND FILM FUNCTIONS START ----------------- //

const findFilm = (regexp, rating = 0, category) => {
  console.log(category);
  if (category == "All") {
    return AllMovies.filter((film) => {
      return film.title.match(regexp) && film.rating >= rating;
    });
  }
  return AllMovies.filter((film) => {
    return (
      film.title.match(regexp) &&
      film.rating >= rating &&
      film.category.includes(category)
    );
  });
};

// ----------------- FIND FILM FUNCTIONS END ----------------- //

// ----------------- FIND FILM LISTENER ----------------- //

$("#submitForm").addEventListener("submit", (e) => {
  $(
    ".wrapper"
  ).innerHTML = ` <div class="lds-roller"><div></div><div></div><div></div><div></div>`;

  const searchValue = $("#filmName").value;

  const filmRating = $("#filmRating").value;
  const filmCategory = $("#category").value;

  const regexp = new RegExp(searchValue, "gi");

  const searchResult = findFilm(regexp, filmRating, filmCategory);

  setTimeout(() => {
    if (searchResult.length > 0) {
      searchResultsRender(searchResult);

      $(".card-res").classList.remove("d-none");

      $(
        "#res"
      ).innerHTML = `<strong>${searchResult.length}</strong> ta ma'lumot topildi`;

     
    } else {
      $(".card-res").classList.add("d-none");
      $(
        ".wrapper"
      ).innerHTML = `<span class="h1_span"><h1 class="text-center text-danger">malumot topilmadi</h1></span>`;
    }
  }, 2000);
});

function searchResultsRender(data = []) {
  $(".wrapper").innerHTML = "";
  data.forEach((el) => {
    const card = createElement(
      "div",
      "card shadow-lg",
      `
        
        <img src="${el.minImg}" alt="img" class="card-img">
                                <div class="card-body">
                                    <h3 class="card-title">
                                        ${el.title}
                                    </h3>
                                    <ul class="list-unstyled">
                                    <li><strong>Language: ${el.lang} </strong></li> 
                                    <li><strong>Category: ${el.category} </strong></li>
                                      <li><strong>Year: ${el.year} </strong></li>
                                    
                                    
                                      <li><strong>Rating: ${el.rating} </strong></li>
                                      <li><strong>Runtime: ${el.time} </strong></li> 
                                      <li><strong><a href="${el.link}" target="_blank">Youtube</a></strong></li>
                                     
                                    </ul>
                                    <div class="social d-flex">
                                        <a href="${el.link}" target="_blank" class="btn btn-danger m-2">
                                            Trailer
                                        </a>
                                        <button class="btn btn-primary m-2">
                                            Read more . . .
                                        </button>
                                        <button class="btn btn-warning m-2">
                                            Add bookmark
                                        </button>
                                    </div>
                                </div>
        
        `
    );

    $(".wrapper").appendChild(card);
  });
}
