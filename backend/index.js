const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // To load env vars from .env file

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.error(err));

// Routes
app.use('/salespersons', require('./routes/salesPerson'));
app.use('/customers', require('./routes/customer'));
app.use('/', require('./routes/order'));
app.use('/reports', require('./routes/reports'));

const PORT = process.env.PORT || 5055;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const SalesPerson = require('./models/SalesPerson');
// const Customer = require('./models/Customer');
// const Order = require('./models/Order');

// const salesPersonData = [
//     { name: "Alice Johnson", city: "New York" },
//     { name: "Bob Smith", city: "Chicago" },
//     { name: "Carol White", city: "San Francisco" },
//     { name: "David Brown", city: "Los Angeles" },
//     { name: "Emma Wilson", city: "Seattle" },
//     { name: "Frank Miller", city: "Miami" },
//     { name: "Grace Lee", city: "Boston" },
//     { name: "Hank Taylor", city: "Houston" },
//     { name: "Ivy Martinez", city: "Phoenix" },
//     { name: "Jack Anderson", city: "Philadelphia" },
//     { name: "Natalie Brooks", city: "Dallas" },
//     { name: "Samuel Foster", city: "Atlanta" },
//     { name: "Olivia Bennett", city: "Denver" },
//     { name: "Ethan Carter", city: "Detroit" },
//     { name: "Sophia Mitchell", city: "Minneapolis" }
//   ];
  
//   // Define Customers manually for each SalesPerson
//   const customerNames = [
//     ["Liam Smith", "Emma Davis", "Noah Wilson", "Olivia Brown", "William Taylor", "Ava Martinez", "James Gonzalez", "Sophia Rodriguez", "Benjamin Lopez", "Isabella Hernandez"],
//     ["Lucas Moore", "Mia Thompson", "Mason White", "Charlotte Harris", "Logan Martin", "Amelia Clark", "Ethan Lewis", "Harper Young", "Daniel King", "Evelyn Wright"],
//     ["Jackson Scott", "Abigail Green", "Sebastian Adams", "Emily Baker", "Aiden Nelson", "Ella Hill", "Matthew Allen", "Avery Torres", "Joseph Rivera", "Sofia Cooper"],
//     ["Samuel Murphy", "Scarlett Reed", "David Bailey", "Grace Kelly", "Carter Howard", "Chloe Ward", "Owen Cox", "Aria Peterson", "Wyatt Gray", "Layla Ramirez"],
//     ["John Wood", "Penelope James", "Luke Watson", "Lillian Brooks", "Jayden Sanders", "Zoey Price", "Dylan Bennett", "Nora Barnes", "Gabriel Ross", "Riley Henderson"],
//     ["Anthony Coleman", "Luna Patterson", "Isaac Perry", "Camila Powell", "Grayson Long", "Violet Patterson", "Andrew Hughes", "Aurora Flores", "Christopher Washington", "Stella Butler"],
//     ["Joshua Simmons", "Hannah Simmons", "Nathan Bryant", "Paisley Russell", "Aaron Griffin", "Savannah Griffin", "Christian Diaz", "Audrey Hayes", "Jonathan Myers", "Bella Ford"],
//     ["Connor Hamilton", "Leah Hamilton", "Isaiah Graham", "Lucy Burns", "Charles Fisher", "Ellie Stone", "Thomas West", "Elliana Dunn", "Hunter Wallace", "Caroline Perkins"],
//     ["Adrian Hart", "Natalie Freeman", "Jeremiah Holmes", "Zoe Lowe", "Eli Morrison", "Hazel Day", "Miles Warren", "Vera Curtis", "Colton Olson", "Madelyn Richards"],
//     ["Robert Hunter", "Elena Stevens", "Jameson Bishop", "Aaliyah Fuller", "Brayden Weaver", "Skylar Black", "Easton Henry", "Piper Bowen", "Jordan Chapman", "Ruby Lambert"],
//     ["Angel Warren", "Autumn Brewer", "Dominic Parsons", "Faith Douglas", "Austin Zimmerman", "Kinsley Johnston", "Jaxson Pierce", "Katherine Morrison", "Kevin Cross", "Clara Tran"],
//     ["Brandon Garrett", "Vivian Sims", "Weston Pope", "Sadie Brady", "Justin Paul", "Mariah Keller", "Brody Drake", "Alexa Kane", "Tyler Davidson", "Maya Baldwin"],
//     ["Jason Wolfe", "Nevaeh Roy", "Bryson Saunders", "Serenity Romero", "Asher Holt", "Kennedy Munoz", "Parker Owen", "Genesis Farmer", "Ayden Delaney", "Mckenzie Cobb"],
//     ["Jose Walsh", "Madeline Whitaker", "Sawyer Park", "Brielle Flowers", "Roman Tate", "Valeria Sherman", "Amir Rhodes", "Adelyn Joseph", "Kaiden Barber", "Melanie Schroeder"],
//     ["Leonardo Hopkins", "Liliana Jefferson", "Camden Berger", "Delilah Kerr", "Brooks Winters", "Isabelle Bridges", "Declan Jefferson", "Reagan Madden", "Rowan Pitts", "Sydney Hensley"]
//   ];
  
//   // Utility to generate random amount
//   const getRandomAmount = () => Math.floor(Math.random() * 1000) + 100;
  
//   // Utility to generate random date within last 6 months
//   const getRandomOrderDate = () => {
//     const daysAgo = Math.floor(Math.random() * 180);
//     const date = new Date();
//     date.setDate(date.getDate() - daysAgo);
//     return date;
//   };
  
//   async function seedManualData() {
//     try {
//       // Check if SalesPersons already exist
//       const existingSP = await SalesPerson.countDocuments();
//       if (existingSP > 0) {
//         console.log('🚫 Data already exists. Seeding skipped.');
//         process.exit();
//       }
  
//       console.log('🔄 Seeding manual data...');
  
//       const salesPersons = [];
//       const customers = [];
  
//       // Insert SalesPersons
//       for (const sp of salesPersonData) {
//         const salesPerson = new SalesPerson(sp);
//         await salesPerson.save();
//         salesPersons.push(salesPerson);
//       }
//       console.log('✅ SalesPersons created.');
  
//       // Insert Customers
//       for (let i = 0; i < salesPersons.length; i++) {
//         const sp = salesPersons[i];
//         const custNames = customerNames[i];
  
//         for (const cname of custNames) {
//           const customer = new Customer({
//             name: cname,
//             city: sp.city,
//             salesPersonId: sp._id
//           });
//           await customer.save();
//           customers.push(customer);
//         }
//       }
//       console.log('✅ Customers created.');
  
//       // Insert Orders
//       const orders = [];
//       for (const cust of customers) {
//         for (let i = 0; i < 20; i++) {
//           orders.push({
//             orderDate: getRandomOrderDate(),
//             orderAmt: getRandomAmount(),
//             customerId: cust._id,
//             salesPersonId: cust.salesPersonId
//           });
//         }
//       }
//       await Order.insertMany(orders);
//       console.log('✅ Orders created.');
  
//       console.log('🎉 All manual data seeded successfully!');
//       process.exit();
//     } catch (error) {
//       console.error('❌ Seeding Error:', error);
//       process.exit(1);
//     }
//   }

  
// seedManualData();
