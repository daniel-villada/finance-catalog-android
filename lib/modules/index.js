import auth from "./auth";
import catalog from "./catalog";

const modules = (wrap) => ({
    ...auth(wrap),
    ...catalog(wrap),
});

export default modules;