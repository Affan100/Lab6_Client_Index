let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');  //เรียกใช้คนละโดเมนได้
let app = express();


app.use(cors()); //เสริม


app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = [
    { 'std': 0, 'id': '6035512016', 'name': 'Affan', 'surname': 'Pathan', 'Major': 'CoE', 'gpa': 2.70 },
    { 'std': 1, 'id': '6035512015', 'name': 'Iffan', 'surname': 'Pathan', 'Major': 'CoE', 'gpa': 2.50 }
];

router.route('/students')
    .get((req, res) => res.json(students))

    .post((req, res) => {
        let student = {}
        student.std = students[students.length - 1].std + 1  //อยุ่ในอาเรย์ length มี 2 แต่ในอาเรย์มี 0 1 เลยต้อง -1 และ+1 เพื่อเิ่มอันใหม่
        student.id = req.body.id
        student.name = req.body.name
        student.surname = req.body.surname
        student.Major = req.body.Major
        student.gpa = req.body.gpa
        students.push(student)
        res.json({ message: 'Student created!' })
    })


router.route('/students/:student_id')
    .get((req, res) => {

        let std = req.params.student_id
        let index = students.findIndex(student => (student.std === +std)) ///สำคัญมาก  หรือเขียนแบบ bear.id == id ก็ได้ เทียบหมีตัวแรกที่ส่งมาว่าตรงกันไหม
        console.log(index, students, students[index])
        res.json(students[index])
    })

    .put((req, res) => {                               // Update a bear
        let std = req.params.student_id
        let index = students.findIndex(student => (student.std === +std))

        students[index].id = req.body.id;
        students[index].name = req.body.name;
        students[index].surname = req.body.surname;
        students[index].Major = req.body.Major;
        students[index].gpa = req.body.gpa;

        res.json({ message: 'Student updated!' + req.params.student_id });
    })

    .delete((req, res) => {                   // Delete a bear
        // delete     bears[req.params.bear_id]
        let std = req.params.student_id
        let index = students.findIndex(student => student.std === +std)
        students.splice(index, 1) //การลบที่ตำแหน่งนั้น
        console.log(index, students, std)

        res.json({ message: 'Student deleted: ' + req.params.student_id });
    })



app.use("*", (req, res) => res.status(404).send('404 Not found')); //ขึ้นนอกเหนือให้แสดง Error 404


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(80, () => console.log('Sever running'))












// let express = require('express');
// let bodyParser = require('body-parser');
// let router = express.Router();
// let cors = require('cors');  //เรียกใช้คนละโดเมนได้
// let app = express();


// app.use(cors());


// app.use('/api', bodyParser.json(), router);   //[use json]
// app.use('/api', bodyParser.urlencoded({ extended: false }), router);

// let bears = [
//     { 'id': 0, 'name': 'pooh', 'weight': 211 },
//     { 'id': 1, 'name': 'vinnie', 'weight': 111 }
// ];

// router.route('/bears')
//     .get((req, res) => res.json(bears))

//     .post((req, res) => {
//         let bear = {}
//         bear.id = bears[bears.length - 1].id + 1  //อยุ่ในอาเรย์ length มี 2 แต่ในอาเรย์มี 0 1 เลยต้อง -1 และ+1 เพื่อเิ่มอันใหม่
//         bear.name = req.body.name
//         bear.weight = req.body.weight
//         bears.push(bear)
//         res.json({ message: 'Bear created!' + req.params.bear_id })
//     })


// router.route('/bears/:bear_id')
//     .get((req, res) => {
//         let id = req.param.bear_id
//         let index = bears.findIndex(bear => (bear.id === +id)) ///สำคัญมาก  หรือเขียนแบบ bear.id == id ก็ได้ เทียบหมีตัวแรกที่ส่งมาว่าตรงกันไหม
//         res.json(bears[index])
//     })

//     .put((req, res) => {                               // Update a bear
//         let id = req.params.bear_id
//         let index = bears.findIndex(bear => (bear.id === +id))
//         bears[index].name = req.body.name;
//         bears[index].weight = req.body.weight;
//         res.json({ message: 'Bear updated!' + req.params.bear_id });
//     })

//     .delete((req, res) => {                   // Delete a bear
//         // delete     bears[req.params.bear_id]
//         let id = req.params.bear_id
//         let index = bears.findIndex(bear => bear.id === +id)
//         bears.splice(index, 1) //การลบที่ตำแหน่งนั้น
//         res.json({ message: 'Bear deleted: ' + req.params.bear_id });
//     })



// app.use("*", (req, res) => res.status(404).send('404 Not found')); //ขึ้นนอกเหนือให้แสดง Error 404


// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

// app.listen(80, () => console.log('Sever running'))