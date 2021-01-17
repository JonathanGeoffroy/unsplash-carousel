# Unsplash-carousel

Unsplash-carousel is an example project to learn [React hooks](https://reactjs.org/docs/hooks-intro.html).  
It uses a minimal subset of [Unsplash](https://unsplash.com/) free images to run. Complete dataset can be found [here](https://unsplash.com/data).  
Please note that unsplash-carousel requests the Unsplash site (by loading photos and thumbnails), so please don't abuse of this free and wonderful site :)

## How to use

```
git clone https://github.com/JonathanGeoffroy/unsplash-carousel.git # clone repository
cd unsplash-carousel
npx lerna bootstrap # Download packages dependencies (server & webapp)
npx lerna run start # Start both server & webapp
```

This should run the server on port 1337 and webapp on port 3000 (using [create-react-app scripts](https://create-react-app.dev/)).

## What's inside

Unsplash is built with [lerna](https://github.com/lerna/lerna), and contains two packages :

- **server** is a fake server that serves fake data
- **webapp** is a React app that displays a Carousel of data

### Server

The server respond to two different URLs :

1. `GET /` returns a list of available images :

```
[
    {
        id: "uniqId", // Unique ID
        thumbnailUrl: "https://images.unsplash.com/photo-id", // Thumbnail URL
        details: "http://localhost:1337/{id}", // URL to fetch in order to retrieve image detail
    }
]
```

2. `GET /{id}` returns the details of the image identified by `id` :  
   (please note that this url is available in `details` field of `GET /`)

```
    {
        id: "abcd", // Unique ID
        "imageUrl":  "https://images.unsplash.com/photo-id", // Image URL
        "username": "user name", // Photographer username
        "description": "Some description", // Photo Description (optional)
        "date": "2018-12-08T08:55:57.1707", // Date of the photo (ISO 8601 format)
        "views": 4324517, // Number of views
        "keywords": ["key", "words"] // Array of keywords
    }
```

### webapp

Webapp is a sample project that displays a carousel of server's dataset.
