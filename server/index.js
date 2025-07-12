const express=require("express")
const {connectDb}=require("./connection")
const userRoute=require("./routes/userRoute")
const notesRoute=require("./routes/notes")
const cookieparser=require('cookie-parser')
const cors=require("cors")

const app=express()
const PORT=process.env.PORT ||4000

connectDb('mongodb://127.0.0.1:27017/ai-notes-summariser').then(()=>console.log("DB connected"))

// app.set('view engine','ejs')
// app.set("views",path.resolve("./views"))



app.use(cors({
  origin: 'http://localhost:5174',   
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,                 
  allowedHeaders: ['Content-Type'],
}));


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())


// app.get('/', (req, res) => res.redirect('/signup'));

// app.get('/signup', (req, res) => res.render('signup',));
// app.get('/login', (req, res) => res.render('login'));

app.use('/user',userRoute)
app.use('/notes',notesRoute)

app.listen(PORT,()=>console.log(`server started at${PORT}`))