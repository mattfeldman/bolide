Schedules = new Mongo.Collection('schedules');

Schedule = Astro.Class({
    name: 'Schedule',
    collection: Schedules,
    fields: {
        time: 'string',
        sceneId: 'string',
        enabledDays: {
            nested: {
                name: 'enabledDays',
                fields: {
                    sunday: 'boolean',
                    monday: 'boolean',
                    tuesday: 'boolean',
                    wednesday: 'boolean',
                    thursday: 'boolean',
                    friday: 'boolean',
                    saturday: 'boolean'
                }
            }
        },
        dayNumerals: {
            type: 'array',
            optional: true
        }
    },
    events: {
        afterInsert: function(){
            this.set('dayNumerals', convertDayMapToNumeral(this.enabledDays));
            this.save();
        }
    }
});

function convertDayMapToNumeral(days) {
    let i = 0;
    let numerals = _(days)
        .values() // [bool array]
        .map((val)=> {
            i++;
            if (val) return i;
        })
        .filter(val => val); // remove undefined values
    return numerals;
}