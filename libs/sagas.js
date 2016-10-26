import { call, put } from "redux-saga/effects";
import axios from "./axios";
import Informer from "Informer";

export function* fetchData({ url, data = null, onBegin = () => {}, onSuccess, onError = () => {}, requestMethod = "post" }) {
    yield put(onBegin());

    try {
        const params = requestMethod === "get" ? { params: data } : data;
        const response = yield call(axios[requestMethod], url, params);

        yield put(onSuccess(response.data));
    } catch (e) {
        Informer.showError(e.message);
        yield put(onError(e));
    }
}
