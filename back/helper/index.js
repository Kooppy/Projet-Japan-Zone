/*
 * Helper
 * **************** */
  
const moment = require('moment-timezone');
const frLocal = require('moment/locale/fr')

module.exports = {
    calendarDate: function(datetime, format) {
        if (moment) {
            moment.updateLocale('fr', frLocal);
           let time1 = moment(datetime).tz("Europe/Paris").subtract(10, 'days').calendar()
           return time1
        }
        else {
          return datetime;
        }
      },

    commentDateFormat: function(datetime, format) {
        if (moment) {
            moment.updateLocale('fr', frLocal);
           let time2 = moment(datetime).fromNow()
           return time2
        }
        else {
          return datetime;
        }
      },

    ifstatus: function(a, b, opts) {
        if (a === b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    },

    ifAnd: function(a, b, c, d, opts) {
      if (a === b || c === d ) {
          return opts.fn(this);
      } else {
        console.log('oui');
          return opts.inverse(this);
      }
  }
}