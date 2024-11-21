
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

        document.getElementById('search-button').addEventListener('click', async () => {
            const trackName = document.getElementById('song-input').value;
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';

            try {
                const tracks = await searchTracks(trackName);
                if (tracks.length > 0) {
                    tracks.forEach(track => {
                        const trackElement = document.createElement('div');
                        trackElement.className = 'track-item';

                        const listenButton = document.createElement('button');
                        listenButton.textContent = `Слушать ${track.name} - ${track.artists[0].name}`;
                        listenButton.className = 'track-button';
                        listenButton.onclick = () => playTrack(track.preview_url);

                        trackElement.appendChild(listenButton);
                        resultsContainer.appendChild(trackElement);
                    });
                } else {
                    resultsContainer.textContent = 'Песни не найдены.';
                }
            } catch (error) {
                resultsContainer.textContent = 'Песни не найдены.';
                console.error('Ошибка:', error);
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


        document.addEventListener('DOMContentLoaded', () => {
            const rays = document.querySelectorAll('.light-ray');
            
            rays.forEach(ray => {
                const delay = Math.random() * 2; // случайная задержка
                const duration = Math.random() * 2 + 1; // случайная продолжительность (от 1 до 3 секунд)
                
                ray.style.animationDelay = `${delay}s`;
                ray.style.animationDuration = `${duration}s`;
            });
        });

        document.addEventListener('DOMContentLoaded', () => {
            const numberOfRays = 8; // Увеличено количество кругов
            const container = document.body;
        
            for (let i = 0; i < numberOfRays; i++) {
                const ray = document.createElement('div');
                ray.classList.add('light-ray');
        
                // Генерация случайной позиции по краям экрана
                const edge = Math.floor(Math.random() * 4); // 0 - верх, 1 - право, 2 - низ, 3 - лево
                const offset = Math.random() * 10; // Не большое отклонение от краев
        
                switch (edge) {
                    case 0: // Вверху
                        ray.style.top = `${-5 + offset}vw`; // Ушли вверх немного
                        ray.style.left = `${offset}vw`; // Позиция слева
                        break;
                    case 1: // Справа
                        ray.style.top = `${offset}vw`; // Позиция сверху
                        ray.style.left = `calc(100vw - ${5 + offset}vw)`; // Ушли вправо немного
                        break;
                    case 2: // Внизу
                        ray.style.top = `calc(100vh - ${5 + offset}vw)`; // Ушли вниз немного
                        ray.style.left = `${offset}vw`; // Позиция слева
                        break;
                    case 3: // Слева
                        ray.style.top = `${offset}vw`; // Позиция сверху
                        ray.style.left = `${-5 + offset}vw`; // Ушли влево немного
                        break;
                }
        
                // Генерация случайного цвета для градиента
                const randomColorStart = () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
                const randomColorEnd = () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0)`;
        
                ray.style.background = `radial-gradient(circle, ${randomColorStart()} 30%, ${randomColorEnd()} 100%)`;
        
                // Применяем случайные параметры анимации
                const delay = Math.random() * 2; // случайная задержка до 2 секунд
                ray.style.animationDelay = `${delay}s`;
        
                // Добавляем световой круг на страницу
                container.appendChild(ray);
            }
        });

        










































        document.addEventListener('DOMContentLoaded', () => {
            const numberOfRays = 8; // Количество кругов
            const container = document.body;
        
            for (let i = 0; i < numberOfRays; i++) {
                const ray = document.createElement('div');
                ray.classList.add('light-ray');
        
                // Генерация случайной позиции по краям экрана
                const edge = Math.floor(Math.random() * 4); // 0 - верх, 1 - право, 2 - низ, 3 - лево
                const offset = 10; // Фиксированное смещение для половинного отображения
        
                switch (edge) {
                    case 0: // Вверху
                        ray.style.top = `${-10}vw`; // Располагаем половину круга вне экрана
                        ray.style.left = `${Math.random() * 90}vw`; // Случайная позиция по горизонтали
                        break;
                    case 1: // Справа
                        ray.style.top = `${Math.random() * 90}vw`; // Случайная позиция по вертикали
                        ray.style.left = `calc(100vw - ${10}vw)`; // Половина круга справа
                        break;
                    case 2: // Внизу
                        ray.style.top = `calc(100vh - ${10}vw)`; // Половина круга внизу
                        ray.style.left = `${Math.random() * 90}vw`; // Случайная позиция по горизонтали
                        break;
                    case 3: // Слева
                        ray.style.top = `${Math.random() * 90}vw`; // Случайная позиция по вертикали
                        ray.style.left = `${-10}vw`; // Половина круга слева
                        break;
                }
        
                // Генерация случайного цвета для градиента
                const randomColorStart = () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
                const randomColorEnd = () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0)`;
        
                ray.style.background = `radial-gradient(circle, ${randomColorStart()} 30%, ${randomColorEnd()} 100%)`;
        
                // Применяем случайные параметры анимации
                const delay = Math.random() * 2; // случайная задержка до 2 секунд
                ray.style.animationDelay = `${delay}s`;
        
                // Добавляем световой круг на страницу
                container.appendChild(ray);
            }
        });
        


















        document.addEventListener('DOMContentLoaded', () => {
            const numberOfRays = 8; // Количество кругов
            const container = document.body;
            const videoElement = document.getElementById('video-element');
            const videoUpload = document.getElementById('video-upload');
        
            // Обработчик загрузки видео
            videoUpload.addEventListener('change', (event) => {
                const file = event.target.files[0];
                
                if (file) {
                    const url = URL.createObjectURL(file);
                    videoElement.src = url;
                }
            });
        
            // Создание кругов света
            for (let i = 0; i < numberOfRays; i++) {
                const ray = document.createElement('div');
                ray.classList.add('light-ray');
        
                // Генерация случайной позиции и цвета
                const edge = Math.floor(Math.random() * 4);
                const offset = 10; 
        
                switch (edge) {
                    case 0: // Вверху
                        ray.style.top = `${-10}vw`;
                        ray.style.left = `${Math.random() * 90}vw`;
                        break;
                    case 1: // Справа
                        ray.style.top = `${Math.random() * 90}vw`;
                        ray.style.left = `calc(100vw - ${10}vw)`;
                        break;
                    case 2: // Внизу
                        ray.style.top = `calc(100vh - ${10}vw)`;
                        ray.style.left = `${Math.random() * 90}vw`;
                        break;
                    case 3: // Слева
                        ray.style.top = `${Math.random() * 90}vw`;
                        ray.style.left = `${-10}vw`;
                        break;
                }
        
                // Случайный цвет для круга
                const randomColorStart = () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
                const randomColorEnd = () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0)`;
        
                ray.style.background = `radial-gradient(circle, ${randomColorStart()} 30%, ${randomColorEnd()} 100%)`;
                ray.style.animationDelay = `${Math.random() * 2}s`; // Случайная задержка

                // Добавляем круг на страницу
                container.appendChild(ray);
            }
        });
        