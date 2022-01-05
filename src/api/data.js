import * as api from "./api.js"
export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getAllAlbums() {
    let url = `/data/albums?sortBy=_createdOn%20desc&distinct=name`
    return api.get(url);
};

export async function getSearchItems(search) {
    if (search) {
        return api.get(`/data/albums?where=name%20LIKE%20%22${search}%22`)
    } else {
        return [];
    }
    
}

export async function createAlbum(data) {
    return api.post('/data/albums', data)
};

export async function getAlbumById(id) {
    return api.get('/data/albums/' + id);
};

export async function deleteAlbum(id) {
    return api.del('/data/albums/' + id);
};

export async function editAlbum(id, data) {
    return api.put('/data/albums/' + id, data);
};


// const pageSize = 4;

// const endpoints = {
//     all: `/data/catalog?pageSize=${pageSize}&offset=`,
//     count: '/data/catalog/?count',
//     byId: '/data/catalog/',
//     myItems: (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`,
//     create: '/data/catalog',
//     edit: '/data/catalog/',
//     delete: '/data/catalog/'
// };

// export async function getAll(currentPage, search, type) {
//     let url1 = endpoints.all + (currentPage - 1) * pageSize;
//     let url2 = endpoints.count;
//     search.toLowerCase();
//     type.toLowerCase();

//     if (search) {
//         url1 += '&where=' + encodeURIComponent(`make LIKE "${search}"`);
//         url2 += '&where=' + encodeURIComponent(`make LIKE "${search}"`);
//     };
    
//     const [data, count] = await Promise.all([
//         api.get(url1),
//         api.get(url2)
//     ]);
//     return {
//         data,
//         pages: Math.floor(count / pageSize)
//     };
// };

// export async function getById(id) {
//     return api.get(endpoints.byId + id);
// };

// export async function getMyItems(userId) {
//     return api.get(endpoints.myItems(userId));
// };

// export async function createItem(data) {
//     return api.post(endpoints.create, data);
// };

// export async function editItem(id, data) {
//     return api.put(endpoints.edit + id, data);
// };

// export async function deleteItem(id) {
//     return api.del(endpoints.delete + id);
// };