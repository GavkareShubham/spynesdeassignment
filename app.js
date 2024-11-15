const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const user = require('./models/user');

// setup json bz hamara form work kare
// ejs ke liye view engine setup kare

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
    // res.send("hey");
    res.render("index");  //for page rendernig  
    //we are using index.ejs and node here for server side rendering
})

app.get("/read", async (req, res) => {

    let Allusers = await userModel.find();  //this will find all users

    //first read all users above and then render 
    res.render("read", { users: Allusers });  //if we use use users in place of Allusers then we can write only {users} at this place
})

app.post("/create", async (req, res) => {
    let { name, email, image } = req.body;

    let userCreated = await userModel.create({
        name: name,
        email: email,
        image: image
    });


    // res.send(userCreated); //we are sending the data om console here but we want it to render or redirect so
    res.redirect("./read");
})

app.get('/edit/:userid', async (req, res) => {
    let user = await userModel.findOne({ _id: req.params.userid });
    res.render("edit", { user });
})

//below is a post route bz we are sending data to server - Commonly used for submitting forms, uploading files, or sending any data that might modify the server's state
//get route is retrive data from server
app.post('/update/:userid', async (req, res) => {

    //first take data into var
    let { image, name, email } = req.body;

    let user = await userModel.findOneAndUpdate({ _id: req.params.userid }, { image, name, email }, { new: true });
    //update user by considering ({id},{change this data},{update into new one});
    //we recieve updated user in user name variable
    res.redirect("/read");
})

app.get('/delete/:id', async (req, res) => {
    let deleteduser = await userModel.findOneAndDelete({ _id: req.params.id });
    //jaise hi delete ho vapas se read route pe chale aaye
    res.redirect("/read");
})



app.listen(3001);


// In web development, `GET` and `POST` are two of the most commonly used HTTP methods. They are used for different purposes when interacting with a server. Here's a breakdown of their differences:

// ### 1. **Purpose:**

// - **GET:**
//   - **Used to retrieve data** from the server.
//   - Typically used for fetching resources like web pages, data, or images.
//   - Should **not change the state** of the server (i.e., it is **idempotent** and considered a safe operation).
  
// - **POST:**
//   - **Used to send data** to the server.
//   - Commonly used for submitting forms, uploading files, or sending any data that might modify the server's state.
//   - The server typically performs some action with the data and returns a response, such as adding a new record to a database.

// ### 2. **Parameters:**

// - **GET:**
//   - Parameters (data) are sent as part of the URL (in the query string).
//     - Example: `https://example.com/search?q=webdev`
//   - Limited by the length of the URL (depending on the browser/server, typically around 2048 characters).

// - **POST:**
//   - Parameters are sent in the body of the HTTP request.
//     - Example: Form data in the body of the request, not visible in the URL.
//   - No size limitations on the data being sent (aside from server configuration).

// ### 3. **Visibility:**

// - **GET:**
//   - The data is visible in the URL (query string), which means it can be bookmarked or cached.
//   - Less secure for sending sensitive information (e.g., passwords, personal data).

// - **POST:**
//   - Data is sent in the request body, making it **more secure** than GET (though still not completely secure without encryption like HTTPS).
//   - Parameters are not exposed in the URL, so they are not bookmarked or cached.

// ### 4. **Caching:**

// - **GET:**
//   - Responses from GET requests can be cached by browsers or intermediate caches (like a proxy).
//   - This can improve performance when retrieving the same resource multiple times.

// - **POST:**
//   - POST requests are **not cached** by default, as they usually modify server-side data.

// ### 5. **Idempotency:**

// - **GET:**
//   - GET requests are idempotent, meaning making the same GET request multiple times will have the same effect and not alter the server's state.

// - **POST:**
//   - POST requests are **not idempotent**. Sending the same POST request multiple times can result in different effects (e.g., submitting the same form multiple times might create duplicate records).

// ### 6. **Usage Examples:**

// - **GET Example:**
//   - When you visit a website like `https://example.com/profile`, you are making a `GET` request to fetch the profile page data.
  
// - **POST Example:**
//   - When you submit a form with user data, such as a registration form on a website, you are making a `POST` request, sending the form data to the server.

// ### Summary:

// - **GET:** For retrieving or fetching data (safe, can be cached, limited data size in URL).
// - **POST:** For sending or submitting data (not cached, suitable for sending larger or sensitive data).