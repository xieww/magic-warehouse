import Storage from "./storage";

const local = new Storage("localStorage");
const session = new Storage("sessionStorage");

export default { local, session };
