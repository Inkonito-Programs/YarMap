        document.addEventListener('DOMContentLoaded', () => {
            let clickCount = 0;

            // Функция для обработки кликов на снежинках
            const handleSnowflakeInteraction = () => {
                clickCount++;

                if (clickCount === 5) {
                    setTimeout(() => {
                        alert('Упс.., нас раскрыли. Вы нашли секретное сообщение от разработчиков.');
                    }, 0);
                    clickCount = 0; // Сброс счетчика после вывода сообщения
                }
            };

            // Функция для сброса счетчика, если клик был вне снежинки
            const handleClickOutsideSnowflake = (event) => {
                // Проверяем, был ли клик на снежинке
                if (!event.target.closest('.snowflake')) {
                    clickCount = 0; // Сбрасываем счетчик
                }
            };

            // Функция для добавления обработчиков к снежинкам
            const addSnowflakeListeners = () => {
                const snowflakes = document.querySelectorAll('.snowflake');
                snowflakes.forEach(snowflake => {
                    snowflake.addEventListener('click', handleSnowflakeInteraction);
                });
            };

            // Добавляем обработчики при загрузке страницы
            addSnowflakeListeners();

            // Добавляем обработчик для кликов вне снежинки
            document.addEventListener('click', handleClickOutsideSnowflake);

            // Если снежинки добавляются динамически, можно использовать MutationObserver
            const observer = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        addSnowflakeListeners(); // Перепривязываем обработчики, если снежинки добавились
                    }
                }
            });

            // Наблюдаем за изменениями в DOM
            observer.observe(document.body, { childList: true, subtree: true });
        });