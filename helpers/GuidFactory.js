const nullGuid = "00000000-0000-0000-0000-000000000000";

const GuidFactory = {
    create() {
        return [this._gen(2), this._gen(1), this._gen(1), this._gen(1), this._gen(3)].join("-");
    },
    createList(count) {
        var guids = [];
        for (var index = 0; index < count; index++) {
            guids.push(this.create());
        }

        return guids;
    },
    isNullOrEmpty(guid) {
        return !guid || guid === nullGuid
    },
    _s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    },
    _gen(times) {
        var result = "";
        for (var i = 0; i < times; ++i) {
            result += this._s4();
        }
        return result;
    }
};

export const createGuid = () => GuidFactory.create();
export const isNullOrEmpty = (guid) => GuidFactory.isNullOrEmpty(guid);
export const createGuidList = (count = 0) => GuidFactory.createList(count);
