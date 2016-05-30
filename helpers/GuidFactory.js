export const GuidFactory = {
    create: function () {
        return [this._gen(2), this._gen(1), this._gen(1), this._gen(1), this._gen(3)].join("-");
    },
    createList: function (count) {
        var guids = [];
        for (var index = 0; index < count; index++) {
            guids.push(this.create());
        }

        return guids;
    },
    _s4: function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    },
    _gen: function(times) {
        var result = "";
        for (var i = 0; i < times; ++i) {
            result += this._s4();
        }
        return result;
    }
};
