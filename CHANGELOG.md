# Change Log

> **Теги:**
> - :boom:      [Breaking Change]
> - :rocket:    [New Feature]
> - :bug:       [Bug Fix]
> - :memo:      [Documentation]
> - :house:     [Infrastructure]
> - :nail_care: [Polish]


## v1.20.14 (27.10.2016)
### :bug: Bug Fix
- Исправлены стили у _RadioButton_ (background color)


## v1.20.13 (26.10.2016)
### :house: Infrastructure
- Добавлен data-аттрибут с id для кнопки закрытия _PerfectLightbox_


## v1.20.12 (26.10.2016)
### :rocket: New Feature
- Добавлен хелпер для _redux-saga_


## v1.20.11 (25.10.2016)
### :nail_care: Polish
- Убрана зависимость от класса у миксина _product-icon_


## v1.20.10 (25.10.2016)
### :bug: Bug Fix
- Исправлен баг с фокусом на компактном инпуте в ie

### :house: Infrastructure
- Добавлен конфиг для _eslint_ при прогоне на сервере CI
- Добавлены тесты для _ValidationHelpers_

### :nail_care: Polish
- Подправлены _ValidationHelpers_


## v1.20.9 (24.10.2016)
### :bug: Bug Fix
- Добавлен вертикальный скролл для _PerfectLightbox_


## v1.20.8 (24.10.2016)
### :bug: Bug Fix
- Переделан внешний вид кнопок и ссылок при фокусе


## v1.20.7 (24.10.2016)
### :bug: Bug Fix
- Исправлен баг с закрытием _PerfectLightbox_


## v1.20.6 (23.10.2016)
### :rocket: New Feature
- Добавлена валидация на телефон


## v1.20.5 (22.10.2016)
### :rocket: New Feature
- Добавлен экспорт типа тултипа для _TextInput_

### :bug: Bug Fix
- Исправлен бар валидации email


## v1.20.4 (21.10.2016)
### :rocket: New Feature
- Добавлен id для автотестов для текста _Option_


## v1.20.3 (21.10.2016)
### :rocket: New Feature
- Добавлены id для автотестов в _Dropdown_ и _Option_


## v1.20.2 (21.10.2016)
### :bug: Bug Fix
- Исправлен баг с резервированием места для _WarningMessage_ при скрытии


## v1.20.1 (20.10.2016)
### :bug: Bug Fix
- Исправлен импорт _MessageType_ для _WarningMessage_


## v1.20.0 (20.10.2016)
### :boom: Breaking Change
- Удален старый _AutocompleteWrapper_


## v1.19.6 (20.10.2016)
### :bug: Bug Fix
- Исправлена работа _FileUploadForm_ с несколькими файлами


## v1.19.5 (20.10.2016)
### :bug: Bug Fix
- Исправлены id для автотестов на _Checkbox_


## v1.19.4 (20.10.2016)
### :bug: Bug Fix
- Исправлена ошибка при вызове _destroy_ на _Clipboard_


## v1.19.2 (19.10.2016)
### :bug: Bug Fix
- Добавлено изменение _fileId_ при обновлении _FileUploadForm_
- Исправлена функция валидации email
- Исправлен баг _Calendar_


## v1.19.1 (18.10.2016)
### :bug: Bug Fix
- Добавлена возможность делать _Calendar_ пустым


## v1.19.0 (18.10.2016)
### :rocket: New Feature
- Добавлен публичный метод _getValidationResult_ в _Calendar_


## v1.18.7 (17.10.2016)
### :rocket: New Feature
- Добавлена иконка ОФД


## v1.18.6 (13.10.2016)
### :house: Infrastructure
- Добавлены тесты на хелпер _findEntity_


## v1.18.5 (13.10.2016)
### :rocket: New Feature
- Добавлен новый хелпер _findEntity_

### :bug: Bug Fix
- Добавлено сбрасывание высоты блока при завершении аниамации _SlideToggle_


## v1.18.4 (13.10.2016)
### :rocket: New Feature
- Добавлена подсветка текста для _Autocomplete_

### :bug: Bug Fix
- Исправлен формат вывода для _BankAutocomplete_


## v1.18.3 (12.10.2016)
### :bug: Bug Fix
- Добавлен _debounce_ для _Autocomplete_


## v1.18.2 (12.10.2016)
### :bug: Bug Fix
- Изменены размеры ButtonSize.small
- Добавлен стиль "overflow: hidden" в _SlideToggle_, вместо изменения opacity


## v1.18.0 (12.10.2016)
### :rocket: New Feature
- Добавлен внешний метод _getValidationResult_ для инпутов


## v1.17.2 (12.10.2016)
### :bug: Bug Fix
- Исправлен баг с позиционированием _Tooltip_


## v1.17.1 (10.10.2016)
### :bug: Bug Fix
- Исправлены новые функции валидации
- Исправлен баг с позиционированием _Tooltip_


## v1.17.0 (10.10.2016)
### :rocket: New Feature
- Добавлены новые функции валидации


## v1.16.1 (10.10.2016)
### :bug: Bug Fix
- Исправлен баг с отображением _Option_
- Исправлен баг с форматом _BankAutocomplete_
- Подправлен плейсхолдер word-break


## v1.16.0 (06.10.2016)
### :rocket: New Feature
- Добавлен _ContactsDropdown_ ([@scalder27](https://github.com/scalder27))

### :bug: Bug Fix
- Исправлен баг с пропаданием текста в дропдауне

### :house: Infrastructure
- Изменен _precommit_ hook


## v1.15.8 (06.10.2016)
### :rocket: New Feature
- Добавлено свойство _fadeCaption_ в _Dropdown_

### :bug: Bug Fix
- Подправлена верстка в _Dropdown_ и _Option_


## v1.15.7 (06.10.2016)
### :bug: Bug Fix
- Исправлен формат вывода в BankAutocomplete

### :house: Infrastructure
- Настройка CI
