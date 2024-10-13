const fileURL = "musics/Larry_Gaaga_ft_Joeboy_-_Ready_Loadedsongs.com.ng.mp3";
fetch(fileURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            window.jsmediatags.read(blob, {
                onSuccess: function(tag) {
                    const tags = tag.tags;
                    console.log(tags.title);
                    if (tags.picture) {
                        const picture = tags.picture;
                        const base64String = arrayBufferToBase64(picture.data);
                        const imgURL = `data: ${picture.format}; base64,${base64String}`
                        const imgElement = document.querySelector('#image');
                        console.log(imgURL);
                        imgElement.src = imgURL;
                    } else {
                        console.log("No album art found in metadata")
                    }
                },
                onError: function(error) {
                    console.log(error);
                }
            });
        })
        .catch(error => {
            console.log("error fetching the file:", error);
        });
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}