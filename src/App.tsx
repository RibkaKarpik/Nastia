import { createSignal, onMount, onCleanup, For, Show } from 'solid-js';
import './WeddingInvitation.scss';

function WeddingInvitation() {
  const [timeLeft, setTimeLeft] = createSignal({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [selectedPhoto, setSelectedPhoto] = createSignal(null);
  const [isMobile, setIsMobile] = createSignal(false);

  // Тайминг мероприятия
  const schedule = [
    {
      time: "16:00",
      title: "Cбор гостей",
      description: "Какое-то место вписать можно?????",
      photo: "location.svg"
    },
    {
      time: "16:20",
      title: "Выездная регистрация",
      description: "Какое-то место вписать можно?????",
      photo: "two_rings.svg"
    },
    {
      time: "17:00",
      title: "Банкет",
      description: "Ресторан INTROVERT",
      photo: "two_glass.svg"
    },
  ];

  // Галерея локации
  const locationPhotos = [
    "place1.jpg",
    "place2.png",
    "place3.png",
    "place4.png"
  ];

  // Цвета дресс-кода
  const dressCodeColors = [
    { code: "#f1c4c1", name: "Нежный розовый" },
    { code: "#eda9a8", name: "Розовый" },
    { code: "#765c4d", name: "Коричневый" },
    { code: "#ccaf85", name: "Бежевый" },
    { code: "#4c6444", name: "Зеленый" },
    { code: "#cbba9e", name: "Серо-бежевый" },
    { code: "#8b6340", name: "Темно-бежевый" },
    { code: "#4e2e19", name: "Шоколадный" }
  ];

  const openPhoto = (photo) => {
    setSelectedPhoto(photo);
    setTimeout(() => {
      const modal = document.querySelector('.photo-modal');
      if (modal) modal.classList.add('visible');
    }, 10);
  };

  const closePhoto = () => {
    const modal = document.querySelector('.photo-modal');
    if (modal) modal.classList.remove('visible');
    setTimeout(() => setSelectedPhoto(null), 300);
  };

  // Обратный отсчет
  const updateCountdown = () => {
    const now = new Date();
    const weddingDate = new Date(2025, 7, 1, 16, 0, 0);
    const diff = weddingDate - now;

    if (diff <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  onMount(() => {
    // Проверяем мобильное устройство
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Настройка Intersection Observer для плавного появления
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Анимация для дочерних элементов
          const childElements = entry.target.querySelectorAll('.animate-child');
          childElements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('animate-visible');
            }, index * 150);
          });
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Наблюдаем за всеми блоками
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(block => observer.observe(block));

    onCleanup(() => {
      clearInterval(timer);
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
    });
  });

  return (
      <div class="wedding-invitation-container">
        {/* Левая колонка - только для десктопов */}
        <Show when={!isMobile()}>
          <div class="left-column"></div>
        </Show>

        {/* Центральная колонка */}
        <div class="center-column">
          {/* Модальное окно для увеличенного фото */}
          <Show when={selectedPhoto()}>
            <div class="photo-modal" onClick={closePhoto}>
              <div class="modal-content">
                <img src={selectedPhoto()} alt="Увеличенное фото локации" />
              </div>
            </div>
          </Show>

          {/* Блок 1 */}
          <div class="block">
            <div class="block1-top">
              <div class="block1-left animate-child">
                <p class="child-question">Интересно, кто будет моим мужем, когда я выросту?</p>
                <div class="photo-card">
                  <img src="girl.jpg" style={{width:"95%"}}/>
                  <p>Настя, 5 лет</p>
                </div>
              </div>
              <div class="block1-right animate-child">
                <img src="flower.svg" alt="Цветок" class="flower" />
              </div>
            </div>

            <div class="block1-middle animate-child">
              <h1>Н+С=</h1>
              <img src="heart.svg" alt="Сердце"/>
            </div>

            <div class="block1-bottom">
              <div class="smile-emoji animate-child"><img src={'smile.svg'}/></div>
              <div class="block1-right-content animate-child">
                <div class="photo-card">
                  <img src="boy.jpg" style={{width:"90%"}}/>
                  <p>Саша, 6 лет</p>
                </div>
                <p class="answer">Им буду я!</p>
              </div>
            </div>
          </div>

          {/* Блок 2 */}
          <div class="block text-block">
            <h1 class="animate-child">Узнаете этих детишек?</h1>
            <p class="main-text animate-child">
              Да-да, это мы! Время пролетело так быстро, представляете? И вот, повзрослев, мы приняли решение, что пора жениться!
              <br /><br />
              Приглашаем вас присоединиться к нашему первому семейному празднику - нашей свадьбе! Будем счастливы, если это событие вы разделите с нами.
              <br /><br />
              Свадьба состоится:
            </p>

            <div class="date-box animate-child">
              <div class="date-day">1</div>
              <div class="date-month">августа</div>
              <div class="date-day">16:00</div>
            </div>

            <p class="signature animate-child">С любовью,<br />Александр и Анастасия</p>

            <img src="girl_boy.svg" alt="Мы вместе" class="couple-photo animate-child" />

            <div class="countdown animate-child">
              <h1>До свадьбы осталось</h1>
              <div class="countdown-timer">
                <div class="countdown-item">
                  <div class="countdown-value">{timeLeft().days}</div>
                  <div class="countdown-label">дней</div>
                </div>
                <div class="countdown-item">
                  <div class="countdown-value">{timeLeft().hours}</div>
                  <div class="countdown-label">часов</div>
                </div>
                <div class="countdown-item">
                  <div class="countdown-value">{timeLeft().minutes}</div>
                  <div class="countdown-label">минут</div>
                </div>
                <div class="countdown-item">
                  <div class="countdown-value">{timeLeft().seconds}</div>
                  <div class="countdown-label">секунд</div>
                </div>
              </div>
            </div>

            <div class="photo-card2 animate-child">
              <img src="girl_boy.jpg" alt="Любовь" class="love-photo" />
              <p> </p>
            </div>
          </div>

          {/* Блок 3 - Тайминг */}
          <div class="block timing-block">


            <h1 class="animate-child">Тайминг</h1>

            <div class="schedule-container">
              <For each={schedule}>
                {(item, index) => (
                    <div class="schedule-item animate-child" style={`transition-delay: ${index() * 0.15}s`}>
                      <div class="schedule-photo">
                        <img src={item.photo} alt={item.title} />
                      </div>
                      <div class="schedule-details">
                        <div class="schedule-time-title">
                          <div class="schedule-time">{item.time}</div>
                          <div class="schedule-title">{item.title}</div>
                        </div>
                        <div class="schedule-description">
                          {item.description}
                        </div>
                      </div>
                    </div>
                )}
              </For>
            </div>

            <div class="dress-code-block">
              <h1 class="animate-child">Дресс-код</h1>
              <p class="dress-code-text animate-child">
                Мы будем рады, если вы поддержите цветовую палитру нашей свадьбы
              </p>

              <div class="color-palette">
                <For each={dressCodeColors}>
                  {(color, index) => (
                      <div class="color-item animate-child"
                           style={`background-color: ${color.code}; transition-delay: ${index() * 0.1}s`}>
                        <div class="color-info">
                          <span class="color-code">{color.name}</span>
                          <span class="color-name">{color.code}</span>
                        </div>
                      </div>
                  )}
                </For>
              </div>
            </div>

            <h1 class="animate-child">Локация</h1>
            <p class="location-description animate-child">
              Наше торжество пройдет в стильном ресторане "Интроверт" по адресу:<br />
              г. Курск, ул. Магистральная, д. 2
            </p>

            <div class="location-gallery-container animate-child">
              <div class="location-gallery">
                <For each={locationPhotos}>
                  {(photo, index) => (
                      <div class="gallery-item animate-child"
                           onClick={() => openPhoto(photo)}
                           style={`transition-delay: ${index() * 0.1}s`}>
                        <img src={photo} alt="Усадьба" class="gallery-photo" />
                      </div>
                  )}
                </For>
              </div>
            </div>

            <h1 class="map-title animate-child">Как добраться</h1>
            <div class={"map_block"}>
              <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A07a9d24f0bb412f7f34302d67148e32e1e632f96a8db1b71cf1f74cee80bbf49&amp;source=constructor" width="500" height="400" frameborder="0"></iframe>
            </div>




            <h1 class="animate-child">Локация</h1>
            <p class="location-description animate-child">
              Мы просим вас не дарить нам цветы, после торжества мы сразу уезжаем в долгожданное путешествие и не успеем насладиться этой красотой! Но, по желанию, выразить вашу любовь и радость можно в виде бутылки вашего любимого алкоголя , которая, мы обещаем, не завянет.
            </p>
          </div>
        </div>

        {/* Правая колонка - только для десктопов */}
        <Show when={!isMobile()}>
          <div class="right-column"></div>
        </Show>
      </div>
  );
}

export default WeddingInvitation;