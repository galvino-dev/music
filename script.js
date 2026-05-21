document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       PAGE TRANSITION
    ========================= */

    const menuItems =
        document.querySelectorAll(".menu li");

    const pages =
        document.querySelectorAll(".page");



    menuItems.forEach(function (item) {

        item.addEventListener("click", function () {

            const target =
                item.dataset.page;



            pages.forEach(function (page) {

                page.classList.remove("active");

            });



            document
                .getElementById(target)
                .classList.add("active");

        });

    });



    /* =========================
       ELEMENT
    ========================= */

    const songContainer =
        document.querySelector(".song-container");

    const searchInput =
        document.getElementById("searchInput");



    const modal =
        document.getElementById("modal");

    const closeBtn =
        document.getElementById("closeBtn");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalArtist =
        document.getElementById("modalArtist");

    const modalChord =
        document.getElementById("modalChord");



    let allSongs = [];



    /* =========================
       OPEN MODAL
    ========================= */

    function openModal(song) {

        modal.classList.add("show");



        modalTitle.innerText =
            song.title;

        modalArtist.innerText =
            song.artist;

        modalChord.innerText =
            song.chord;

    }



    /* =========================
       CLOSE MODAL
    ========================= */

    function closeModal() {

        modal.classList.remove("show");

    }



    /* =========================
       RENDER SONGS
    ========================= */

    function renderSongs(songs) {

        songContainer.innerHTML = "";



        songs.forEach(function (song) {

            const card =
                document.createElement("div");



            card.classList.add("song-card");



            card.innerHTML = `

                <h3>${song.title}</h3>

                <span>${song.artist}</span>

            `;



            card.addEventListener("click", function () {

                openModal(song);

            });



            songContainer.appendChild(card);

        });

    }



    /* =========================
       FETCH SONGS
    ========================= */

    fetch("http://localhost:5010/songs")

        .then(function (response) {

            return response.json();

        })

        .then(function (songs) {

            allSongs = songs;

            renderSongs(allSongs);

        });



    /* =========================
       SEARCH
    ========================= */

    searchInput.addEventListener("input", function () {

        const keyword =
            searchInput.value.toLowerCase();



        const filteredSongs =
            allSongs.filter(function (song) {

                return (

                    song.title
                        .toLowerCase()
                        .includes(keyword)

                    ||

                    song.artist
                        .toLowerCase()
                        .includes(keyword)

                );

            });



        renderSongs(filteredSongs);

    });



    /* =========================
       CLOSE BUTTON
    ========================= */

    closeBtn.addEventListener("click", function () {

        closeModal();

    });



    /* =========================
       CLOSE OUTSIDE
    ========================= */

    window.addEventListener("click", function (event) {

        if (event.target === modal) {

            closeModal();

        }

    });

});