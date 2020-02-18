// DateTimePickerView
// ---------

import Marionette from 'backbone.marionette';

import Flatpickr from 'flatpickr';

const DateTimePickerView = Marionette.ItemView.extend({
    tagName: 'input',
    className: 'date-picker flatpickr-date',
    locale_ru: {
        days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        firstDayOfWeek: 1
    },
    flatpickr: false,
    flatpickrOptions: {
        dateFormat: 'Y.m.d',
        clickOpens: true
    },
    momentOptions: {
        dateFormat: 'YYYY.MM.DD'
    },
    template: false,
    initialize: function () {
        // Localization
        _.extend(this.flatpickrOptions, {
            locale: {
                weekdays: {
                    longhand: this.locale_ru.days,
                    shorthand: this.locale_ru.daysShort
                },
                months: {
                    longhand: this.locale_ru.months,
                    shorthand: this.locale_ru.monthsShort
                },
                firstDayOfWeek: this.locale_ru.firstDayOfWeek
            }
        });

        if(this.getOption('flatpickrOptions')) {
            _.extend(this.flatpickrOptions, this.getOption('flatpickrOptions'))
        }
    },
    onAttach: function () {
        var that = this;
        this.flatpickr = new Flatpickr("#" + that.id, that.flatpickrOptions);
    },
    onBeforeDestroy: function(){
        this.flatpickr.clear();
        this.flatpickr.destroy();
        this.flatpickr = false;
    }
});

export default DateTimePickerView;