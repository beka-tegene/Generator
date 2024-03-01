import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watchRecipe } from "./Middleware/Middleware";
import AuthHook from "./Hook/AuthHook";
import GenHook from "./Hook/GenHook";
import UserHook from "./Hook/UserHook";

const sagaMiddleware = createSagaMiddleware();

const Store = configureStore({
  reducer: {
    AuthHook: AuthHook,
    GenHook: GenHook,
    UserHook: UserHook,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watchRecipe);

export default Store;
