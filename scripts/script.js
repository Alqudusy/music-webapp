const fileURL = [
     "musics/Larry_Gaaga_ft_Joeboy_-_Ready_Loadedsongs.com.ng.mp3",
     "musics/Oxlade_ft_Wande_Coal_-_ASUNASA_HOLD_YOUR_WAIST__Loadedsongs.com.ng.mp3",
     "musics/Bella_Shmurda_ft_BOJ_Krizbeatz_-_Mentali_Loadedsongs.com.ng.mp3",
     "musics/Boy_Spyce_-_Shout_Loadedsongs.com.ng.mp3",
     "musics/CKay_-_In_My_Bed_Loadedsongs.com.ng.mp3",
     "musics/Kcee_-_Netfliss_Loadedsongs.com.ng.mp3",
     "musics/Lordeyang_ft_Damo_K_-_Forgive_Me_Loadedsongs.com.ng.mp3",
     "musics/Mr_Say_-_Ewa_Bamijo_(www.NETNAIJA.com).mp3",
     "musics/Phyno_ft_Johnny_Drille_-_Sweet_Karma_Loadedsongs.com.ng.mp3",
     "musics/Shallipopi_-_Free_Service_Loadedsongs.com.ng.mp3"
    ];
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