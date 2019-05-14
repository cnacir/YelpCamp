const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let campgrounds = [
	{name: "Salmon Creek", image: "https://www.photosforclass.com/download/flickr-7626464792"},
	{name: "Granite Hill", image: "https://www.photosforclass.com/download/flickr-321487195"},
	{name: "Mountain Goat Rest", image: "https://farm4.staticflickr.com/3130/2770459706_3aed20703e.jpg"},
	{name: "Salmon Creek", image: "https://www.photosforclass.com/download/flickr-7626464792"},
	{name: "Granite Hill", image: "https://www.photosforclass.com/download/flickr-321487195"},
	{name: "Mountain Goat Rest", image: "https://farm4.staticflickr.com/3130/2770459706_3aed20703e.jpg"}
]

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
	res.render("landing");
});

app.get("/campgrounds", (req, res) => {
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
	const name = req.body.name;
	const image = req.body.image;

	let newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
	res.render("new.ejs");
});

app.listen(3000, () => console.log("Camp has started!"));
