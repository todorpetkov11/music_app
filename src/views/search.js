import { getSearchItems } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData, paraseQuerystring } from "../utils.js";

const searchTemplate = (onSearch, isLogged, search, result) => html`
<section id="searchPage">
    <h1>Search by Name</h1>
    <form @submit=${onSearch}>
        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" .value=${search}>
            <button class="button-list">Search</button>
        </div>
    </form>

    <h2>Results:</h2>
    <div class="search-result">
    ${result.length < 1 
        ? html`<p class="no-result">No result.</p>`
        : result.map(a  => {return albumCard(a, isLogged)})}
    </div>
</section>
`;

const albumCard = (album, isLogged) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: ${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${isLogged
        ? html`<div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>`
        : null}

    </div>
</div>
`;

export async function searchPage(ctx) {
    let result = [];
    const querystring = ctx.querystring;
    const query = paraseQuerystring(querystring);
    const search = query || '';
    const isLogged = getUserData();
    console.log(search)

    result = await getSearchItems(search);
    ctx.render(searchTemplate(onSearch, isLogged, search, result));

    async function onSearch(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const search = formData.get('search');
        console.log(search);
        try {
            if (search == '') {
                throw new Error('Search field must be filled!')
                
            }
            ctx.page.redirect(`/search?where=name%20LIKE%20${search}`);
            result = await getSearchItems(search);
            
            ctx.render(searchTemplate(onSearch, isLogged, search, result));
        } catch (err) {
            alert(err.message)

        }
        
    };
};

