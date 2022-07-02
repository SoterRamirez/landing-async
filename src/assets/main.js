const API_URL = "https://youtube-v31.p.rapidapi.com/search?channelId=UC8LeXCWOalN8SxlrPcG-PaQ&part=snippet%2Cid&order=date&maxResults=9";

const content = null || document.getElementById("content");
const contentError = null || document.getElementById("content-error");

const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "36b50e39demshfdb14db3fe1949dp183225jsn151351276489",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
};

async function fetchData(url_Api) {
    const response = await fetch(url_Api, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const videos = await fetchData(API_URL);
        let view = `
        ${videos.items.map(video => `
        <div class="group relative">
            <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
            </a>
        </div>
        `).slice(0,8).join('')}
        `;
        content.innerHTML = view;
    } catch (err) {
        console.error(err);
        const error = `
        <div class="flex justify-center items-center flex-col gap-2 h-44 bg-red-100">
            <h1 class="text-3xl text-red-600">A ocurrido un error...</h1>
            <p class="text-gray-600">...con la lista de videos. This is the following error:</p>
            <p class="text-gray-600 font-bold">${err.message}</p>
        </div>
        `;
        contentError.innerHTML = error;
    }
})();