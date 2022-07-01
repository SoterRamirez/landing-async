const API_URL = "https://youtube-v31.p.rapidapi.com/search?channelId=UC-NM1_vcSZ0O2dtuASOwRew&part=snippet%2Cid&order=date&maxResults=9";

const content = null || document.getElementById("content");

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
        `).slice(0,4).join('')}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();