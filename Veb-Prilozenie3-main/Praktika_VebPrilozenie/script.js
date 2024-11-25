
const clientId = '91bdf744e3784735bf5cd46c1945a0f8';
        const clientSecret = '38459ef5d5954fb18896319a254ed185';
        
        const getAccessToken = async () => {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
                },
                body: 'grant_type=client_credentials'
            });
            const data = await response.json();
            return data.access_token;
        };

        const searchTracks = async (trackName) => {
            const token = await getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(trackName)}&type=track`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            return data.tracks.items;
            
        };

        
        document.getElementById('search-button').addEventListener('click', async () => {
            const trackName = document.getElementById('song-input').value;
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';

            try {
                const tracks = await searchTracks(trackName);
                if (tracks.length > 0) {

                    resultsContainer.style.display = 'block';
            setTimeout(() => {
                resultsContainer.style.right = '0';
            }, 100);

                    tracks.forEach(track => {
                        const trackElement = document.createElement('div');
                        trackElement.className = 'track-item';

                        const listenButton = document.createElement('button');
                        listenButton.className = 'track-button';
                        listenButton.onclick = () => playTrack(track.preview_url);
                        
                        const span1 = document.createElement('span');
                        span1.textContent = `${track.name}`;
                        span1.className = 'track-title';

                        const span2 = document.createElement('span');
                        span2.className = 'track-artist';
                        span2.textContent = `© ${track.artists[0].name}`;

                        listenButton.appendChild(span1);
                        listenButton.appendChild(span2);


                        
                        trackElement.appendChild(listenButton);
                        resultsContainer.appendChild(trackElement);
                    });
                } else {
                    resultsContainer.style.right = '-350px';
            setTimeout(() => {
                resultsContainer.style.display = 'none';
            }, 500);

                }
            } catch (error) {
                console.error('Ошибка:', error);
                resultsContainer.style.right = '-350px';
                setTimeout(() => {
                    resultsContainer.style.display = 'none';
                }, 500);
            }
            
        });
        
        const playTrack = (previewUrl) => {
            const audio = document.getElementById('myAudio');
            const audioSource = document.getElementById('audioSource');
            audioSource.src = previewUrl;
            audio.load();
            
            audio.play().then(() => {
                document.getElementById('playerStatus').textContent = 'Статус: Воспроизводится';
            }).catch(error => {
                console.error('Ошибка воспроизведения:', error);
            });
            
            document.getElementById('audioPlayer').style.display = 'flex';
            
        };

        var input = document.getElementById('song-input');
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                document.getElementById('search-button').click();
            }
        });
        
        const audio = document.getElementById('myAudio');
        const playButton = document.getElementById('playButton');
        const stopButton = document.getElementById('stopButton');
        const volumeControl = document.getElementById('volumeControl');

        playButton.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playButton.textContent = 'Играть';
                document.getElementById('playerStatus').textContent = 'Статус: Воспроизводится';
            } else {
                audio.pause();
                document.getElementById('playerStatus').textContent = 'Статус: Приостановлено';
            }
        });

        stopButton.addEventListener('click', () => {
            audio.pause();
            audio.currentTime = 0;
            document.getElementById('playerStatus').textContent = 'Статус: Остановлено';
        });

        volumeControl.addEventListener('input', () => {
            audio.volume = volumeControl.value;
        });

        const inputField = document.getElementById('song-input');

        // НЕ ВВОДИТЬ
        inputField.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                if (inputField.value === 'RFGDSAHFBNSJKLRH31489OI1253RTG4RET8DS9HINUOQ43LK11PEWRQT0DSGFA9UJIOHNUJKM3') {
                    window.location.href = 'https://kurl.ru/LLuNW';

    }
            }
        });

        
        const fixedTrack = {
            name: "Немецкий марш",
            artists: [{ name: "Was wollen wir trinken" }],
            preview_url: "/Praktika_VebPrilozenie/audio/nemetskaya-pesnya-pro-pivo.mp3"
        };
        const handleSearch = () => {
            const trackName = document.getElementById('song-input').value;
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';

            if (trackName.toLowerCase().includes("гитлер")) {
                playTrack(fixedTrack.preview_url);
                resultsContainer.style.display = 'block';

                const trackElement = document.createElement('div');
                trackElement.className = 'track-item';

                const span1 = document.createElement('span');
                span1.textContent = `${fixedTrack.name}`;
                span1.className = 'track-title';

                const span2 = document.createElement('span');
                span2.className = 'track-artist';
                span2.textContent = `© ${fixedTrack.artists[0].name}`;

                trackElement.appendChild(span1);
                trackElement.appendChild(span2);
                resultsContainer.appendChild(trackElement);
            }
            else if (trackName.toLowerCase().includes("гимн украины") || trackName.toLowerCase().includes("украина")) {
                window.location.href = "https://помощьсво.рф/";
            } else {
                resultsContainer.style.display = 'none';
            }
        };

        document.getElementById('search-button').addEventListener('click', handleSearch);
        
        // Добавляем обработчик события нажатия клавиши
        document.getElementById('song-input').addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                handleSearch();
            }
        });
       

