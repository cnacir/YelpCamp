const express = require('express'),
			app = express(),
			bodyParser = require('body-parser'),
 			mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

const Campground = mongoose.model("Campground", campgroundSchema);


// Campground.create(
// 	{
// 		name: "Salmon Creek",
// 		image: "https://www.photosforclass.com/download/flickr-7626464792"
// 	}, (err, campground) => {
// 		if(err) {
// 			console.log(err);
// 		} else {
// 			console.log(`NEWLY CREATED CAMPGROUND: ${campground}`)
// 		};
// 	});


let campgrounds = [
	{name: "Salmon Creek", image: "https://www.photosforclass.com/download/flickr-7626464792"},
	{name: "Granite Hill", image: "https://www.photosforclass.com/download/flickr-321487195"},
	{name: "Mountain Goat Rest", image: "https://farm4.staticflickr.com/3130/2770459706_3aed20703e.jpg"},
	{name: "Salmon Creek", image: "https://www.photosforclass.com/download/flickr-7626464792"},
	{name: "Granite Hill", image: "https://www.photosforclass.com/download/flickr-321487195"},
	{name: "Mountain Goat Rest", image: "https://farm4.staticflickr.com/3130/2770459706_3aed20703e.jpg"}
]



app.get("/", (req, res) => {
	res.render("landing");
});

app.get("/campgrounds", (req, res) => {
	Campground.find({}, (err, allCampgrounds) => {
		if(err) {
			console.log(err)
		} else {
			res.render("campgrounds", {campgrounds: allCampgrounds});
		};
	});

});

app.post("/campgrounds", (req, res) => {
	const name = req.body.name;
	const image = req.body.image;

	let newCampground = {name: name, image: image};
	Campground.create(newCampground, (err, newlyCreated) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		};
	});
});

app.get("/campgrounds/new", (req, res) => {
	res.render("new.ejs");
});

app.listen(3000, () => console.log("Camp has started!"));
