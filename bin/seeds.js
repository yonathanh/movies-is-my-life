


// const mongoose = require('mongoose');
// const Cinema = require('../models/Cinema');

// const dbName = 'movies-is-my-life-app';
// mongoose.connect(`mongodb://localhost/${dbName}`);

// const cinemaLinks = [
//   {
//     siteName: 'solar movies', 
//     siteLink: 'http://www6.solarmoviesc.com/',
//     imageSrc: 'https://i.imgur.com/G3mpVcJ.png',  
//   },
//   {
//     siteName: 'fmovies', 
//     siteLink: 'http://www4.fmovies.sc/',
//     imageSrc: 'http://i.imgur.com/elDGdiO.png',  
//   },
//   {
//     siteName: 'deepmovie', 
//     siteLink: 'https://www.deepmovie.ch/',
//     imageSrc: 'String',  
//   },
//   {
//     siteName: 'hdo.to', 
//     siteLink: 'https://hdo.to/', 
//     imageSrc: 'String', 
//   },
//   {
//     siteName: 'ymovies.tv', 
//     siteLink: 'https://ymovies.tv/', 
//     imageSrc: 'String', 
//   },
//   {
//     siteName: 'moviewatcher.is', 
//     siteLink: 'https://moviewatcher.is/', 
//     imageSrc: 'String', 
//   },
//   {
//     siteName: 'movie4u.live', 
//     siteLink: 'https://movie4u.live/', 
//     imageSrc: 'String', 
//   },
//   {
//     siteName: 'moviewatcher.is', 
//     siteLink: 'https://moviewatcher.is/', 
//     imageSrc: 'String', 
//   },
//   {
//     siteName: 'rainierland.is', 
//     siteLink: 'http://www.rainierland.is/', 
//     imageSrc: 'String', 
//   },
//   {
//     siteName: '123movies', 
//     siteLink: 'http://www0.123movies.ag/', 
//     imageSrc: 'String', 
//   },
//   {
//     siteName: '123moviesplay', 
//     siteLink: 'https://www.123moviesplay.com/', 
//     imageSrc: 'String', 
//   },
//   {
//     siteName: 'putlockerhub', 
//     siteLink: 'http://putlockerhub.com/', 
//     imageSrc: 'String', 
//   },
//   {
//     siteName: 'putlockers', 
//     siteLink: 'https://putlockers.co/', 
//     imageSrc: 'String', 
//   },
//   {
//     siteName: 'putlockers', 
//     siteLink: 'https://putlockers.cz/', 
//     imageSrc: 'String', 
//   },
//   {
//     siteName: '1putlocker.io', 
//     siteLink: 'https://1putlocker.io/', 
//     imageSrc: 'String', 
//   },
//   {
//     siteName: 'putlocker123.org', 
//     siteLink: 'https://putlocker123.org/', 
//     imageSrc: 'String', 
//   },
//   {
//     siteName: 'putlocker.cl', 
//     siteLink: 'https://putlocker.cl/', 
//     imageSrc: 'String', 
//   },
//   {
//     siteName: 'putlockers.la', 
//     siteLink: 'http://www3.putlockers.la/', 
//     imageSrc: 'String', 
//   },
//   {
//     siteName: 'putlocker.run', 
//     siteLink: 'https://putlocker.run/', 
//     imageSrc: 'String', 
//   },
// ];

// Cinema.create(cinemaLinks)
// .then((theThingIGet)=>{
//   console.log(theThingIGet);
//    mongoos.connection.close(); // no need for control + c, to exit node after creation. function will exit node after for you ;)
// })
// .catch((err)=>{
//   console.log(err);
// })

//-------------------------------------------- End Cinema
//-------------------------------------------- Start Movies

// const mongoose = require('mongoose');
// const Movie = require('../models/Movie');

// const dbName = 'lab-mongoose-movies';
// mongoose.connect(`mongodb://localhost/${dbName}`);

// const movies = [
//   {
//     title : "A Wrinkle in Time",
//     actors:['5b969b76533a59caae3c89e2','5b969b76533a59caae3c89e3','5b969b76533a59caae3c89e5','5b969b76533a59caae3c89e6','5b969b76533a59caae3c89e4','5b969b76533a59caae3c89e8','5b969b76533a59caae3c89e9','5b969b76533a59caae3c89e7'],
//     genre: "Ava DuVernay",
//     plot: "Following the discovery of a new form of space travel as well as Meg's father's disappearance, she, her brother, and her friend must join three magical beings - Mrs. Whatsit, Mrs. Who, and Mrs. Which - to travel across the universe to rescue him from a terrible evil.",
//     image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjMxNjQ5MTI3MV5BMl5BanBnXkFtZTgwMjQ2MTAyNDM@._V1_UX182_CR0,0,182,268_AL_.jpg",
//   },
//   {
//     title : "The Strangers: Prey at Night",
//     actors:['5b969b76533a59caae3c89e5','5b969b76533a59caae3c89e6'],
//     genre: "Johannes Roberts",
//     plot: "A family's road trip takes a dangerous turn when they arrive at a secluded mobile home park to stay with some relatives and find it mysteriously deserted. Under the cover of darkness, three masked psychopaths pay them a visit to test the family's every limit as they struggle to survive.",
//     image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY1OTIwODgzMV5BMl5BanBnXkFtZTgwMzUyMDgzNDM@._V1_UX182_CR0,0,182,268_AL_.jpg"
//   },
//   {
//     title : "The Hurricane Heist",
//     actors:['5b969b76533a59caae3c89e2','5b969b76533a59caae3c89e3','5b969b76533a59caae3c89e5'],
//     genre: "Rob Cohen",
//     plot: "Thieves attempt a massive heist against the U.S. Treasury as a Category 5 hurricane approaches one of its Mint facilities.",
//     image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMzg3Y2MyNjgtMzk4ZS00OTU3LWEwZmMtN2Y0NTdlZjU0NGFiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg"
//   },
//   {
//     title : "Gringo",
//     actors:['5b969b76533a59caae3c89e3','5b969b76533a59caae3c89e5','5b969b76533a59caae3c89e6'],
//     genre: "Nash Edgerton",
//     plot: "GRINGO, a dark comedy mixed with white-knuckle action and dramatic intrigue, explores the battle of survival for businessman Harold Soyinka (David Oyelowo) when he finds himself crossing the line from law-abiding citizen to wanted criminal.",
//     image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjAyMTk2MTQ3Ml5BMl5BanBnXkFtZTgwNDQ2ODE0NDM@._V1_UX182_CR0,0,182,268_AL_.jpg"
//   },
//   {
//     title : "Thoroughbreds",
//     actors:['5b969b76533a59caae3c89e2','5b969b76533a59caae3c89e3'],
//     genre: "Cory Finley",
//     plot: "Two upper-class teenage girls in suburban Connecticut rekindle their unlikely friendship after years of growing apart. Together, they hatch a plan to solve both of their problems-no matter what the cost.",
//     image: "https://images-na.ssl-images-amazon.com/images/M/MV5BNDcyNDA4NDAzN15BMl5BanBnXkFtZTgwODQxMDQ5NDM@._V1_UX182_CR0,0,182,268_AL_.jpg"
//   },
//   {
//     title : "The Leisure Seeker",
//     actors:['5b969b76533a59caae3c89e6','5b969b76533a59caae3c89e4'],
//     genre: "Paolo Virzì",
//     plot: "A runaway couple goes on an unforgettable journey in the faithful old RV they call The Leisure Seeker, traveling from Boston to The Ernest Hemingway Home in Key West. They recapture their passion for life and their love for each other on a road trip that provides revelation and surprise right up to the very end.",
//     image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg1NTg2MzcyNF5BMl5BanBnXkFtZTgwNjMwMDIzNDM@._V1_UX182_CR0,0,182,268_AL_.jpg"
//   },
//   {
//     title : "Black Panther",
//     actors:['5b969b76533a59caae3c89e3','5b969b76533a59caae3c89e5','5b969b76533a59caae3c89e6','5b969b76533a59caae3c89e4','5b969b76533a59caae3c89e8','5b969b76533a59caae3c89e9'],
//     genre: "Ryan Coogler",
//     plot: "T'Challa, the King of Wakanda, rises to the throne in the isolated, technologically advanced African nation, but his claim is challenged by a vengeful outsider who was a childhood victim of T'Challa's father's mistake.",
//     image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_UX182_CR0,0,182,268_AL_.jpg"
//   },
//   {
//     title : "Red Sparrow",
//     actors:['5b969b76533a59caae3c89e5','5b969b76533a59caae3c89e6'],
//     genre: "Francis Lawrence",
//     plot: "Ballerina Dominika Egorova is recruited to 'Sparrow School,' a Russian intelligence service where she is forced to use her body as a weapon. Her first mission, targeting a C.I.A. agent, threatens to unravel the security of both nations.",
//     image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTA3MDkxOTc4NDdeQTJeQWpwZ15BbWU4MDAxNzgyNTQz._V1_UX182_CR0,0,182,268_AL_.jpg"
//   }
// ];


// Movie.create(movies)
// .then((theThingIGet)=>{
//   console.log(theThingIGet);

//   mongoos.connection.close(); // no need for control + c, to exit node after creation. function will exit node after for you ;)
// })
// .catch((err)=>{
//   console.log(err);
// })