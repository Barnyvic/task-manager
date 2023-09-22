"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const tasks_route_1 = __importDefault(require("./routes/tasks-route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.use("/", tasks_route_1.default);
app.use("*", (req, res) => {
    return res.status(404).json({ message: "route not found" });
});
exports.default = app;
//# sourceMappingURL=app.js.map